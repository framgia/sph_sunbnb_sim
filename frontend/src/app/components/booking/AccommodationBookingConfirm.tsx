"use client";
import { Button, Divider, useDisclosure } from "@nextui-org/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChevronLeftIcon from "../svgs/Calendar/ChevronLeftIcon";
import type { AccommodationListing } from "@/app/interfaces/types";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { addDays, format } from "date-fns";
import { isDateBlocked } from "@/app/utils/helpers/booking/DateHelper";
import { createBooking } from "@/app/utils/helpers/booking/request";
import ThankYouModal from "./ThankYouModal";

interface BookingConfirmProps {
  listing: AccommodationListing;
  exclude: Date[];
}
const AccommodationBookingConfirm: React.FC<BookingConfirmProps> = ({
  listing,
  exclude
}) => {
  const router = useRouter();
  const searchQuery = useSearchParams();
  const guests = Number(searchQuery.get("guests"));
  const nights = Number(searchQuery.get("nights"));
  const startDate = useMemo(() => {
    return new Date(searchQuery?.get("start") ?? "");
  }, [searchQuery]);
  const endDate = addDays(startDate, nights);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setLoading] = useState(false);

  const isInvalid = useCallback(() => {
    return (
      startDate >= endDate ||
      guests < 1 ||
      nights < 1 ||
      guests > listing.maximum_guests ||
      nights > listing.listable.maximum_days ||
      isNaN(guests) ||
      isNaN(nights) ||
      isNaN(startDate.valueOf()) ||
      isNaN(endDate.valueOf()) ||
      isDateBlocked(startDate, exclude) ||
      isDateBlocked(endDate, exclude)
    );
  }, [
    endDate,
    guests,
    listing.listable.maximum_days,
    listing.maximum_guests,
    nights,
    startDate,
    exclude
  ]);

  useEffect(() => {
    if (isInvalid()) {
      router.replace("/");
    }
  }, [isInvalid, router]);

  async function handleBooking(): Promise<void> {
    try {
      setLoading(true);
      const startDateFormatted = format(startDate, "yyyy-MM-dd");
      const endDateFormatted = format(endDate, "yyyy-MM-dd");

      const bookingData = {
        start_date: startDateFormatted,
        end_date: endDateFormatted,
        number_of_guests: guests,
        listing_id: listing.id
      };

      const result = await createBooking(bookingData);
      if (result.hasError === true) {
        console.error(result.message);
      } else {
        onOpen();
      }
      setLoading(false);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  }

  return (
    <div className="p-2">
      {isInvalid() ? (
        <></>
      ) : (
        <div className="flex flex-row">
          <div className="w-full md:w-1/2">
            <div className="mb-5 flex flex-row items-center self-center">
              <Button
                className="bg-white"
                isIconOnly
                onPress={() => {
                  router.back();
                }}
              >
                <ChevronLeftIcon />
              </Button>
              <span className="hidden text-xl font-bold md:block">
                Request to book
              </span>
              <div className="block flex w-full justify-center md:hidden">
                <span className=" text-base font-bold">Confirm and pay</span>
              </div>
            </div>
            <div className="mx-[-9999px] block h-[1px] bg-foreground-200 md:hidden" />
            <div className="flex flex-col p-5 pl-10">
              <div className="mb-2 block md:hidden">
                <div className="mb-5 flex flex-row">
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl">
                    <Image
                      className="object-fill"
                      src={listing.media[0].media}
                      alt={listing.name}
                      fill
                      loading="lazy"
                    />
                  </div>
                  <div className="flex w-3/4 flex-col px-2">
                    <span className="text-md font-bold">{listing.name}, </span>
                    <span className="text-md font-bold">
                      {listing.listable.type}
                    </span>
                  </div>
                </div>

                <div className="mx-[-9999px] block h-1 bg-foreground-200 md:hidden" />
              </div>
              <div className="mb-10">
                <span className="text-xl font-bold md:text-lg">Your trip</span>
              </div>
              <div className="mb-2">
                <span className="text-md md:font-bold">Dates</span>
              </div>
              <div className="mb-10">
                <span className="text-md">
                  {startDate.toDateString().split(" ")[1] +
                    " " +
                    startDate.getDate() +
                    " - " +
                    endDate.getDate()}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-md md:font-bold">Guests</span>
              </div>
              <div className="mb-10">
                <span className="text-md">{guests}</span>
              </div>
              <div className="mb-5 block md:hidden">
                <div className="mb-2 mt-5 flex flex-col">
                  <span className="text-xl font-bold">Price details</span>
                </div>
                <div className="mb-10 flex flex-row justify-between">
                  <span className="text-sm">
                    ₱ {listing.price} × {nights} nights
                  </span>
                  <span className="text-sm">₱ {listing.price * nights}</span>
                </div>
                <Divider className="mb-2" />
                <div className="mb-5 flex w-full flex-row justify-between">
                  <span className="text-sm font-bold">Total (PHP)</span>
                  <span className="text-sm">₱ {listing.price * nights}</span>
                </div>
              </div>
              <div className="flex justify-center md:block">
                <Button
                  size="lg"
                  className="w-4/5 md:w-3/4"
                  color="primary"
                  isDisabled={isInvalid() || isLoading}
                  onPress={async () => {
                    await handleBooking();
                  }}
                >
                  Book
                </Button>
              </div>
            </div>
          </div>
          <div className="flex hidden w-1/2 flex-col rounded-xl border-1 border-black bg-white p-10 md:block">
            <div className="h-72">
              <div className="mb-5 flex flex-row">
                <div className="relative h-20 w-20 overflow-hidden rounded-xl">
                  <Image
                    className="object-fill"
                    src={listing.media[0].media}
                    alt={listing.name}
                    fill
                    loading="lazy"
                  />
                </div>
                <div className="flex w-3/4 flex-col px-2">
                  <span className="text-md font-bold">{listing.name}, </span>
                  <span className="text-md font-bold">
                    {listing.listable.type}
                  </span>
                </div>
              </div>
              <div className="my-5 flex flex-col">
                <span className="text-xl font-bold">Price details</span>
              </div>
              <div className="flex flex-row justify-between">
                <span className="text-sm">
                  ₱ {listing.price} × {nights} nights
                </span>
                <span className="text-sm">₱ {listing.price * nights}</span>
              </div>
            </div>
            <Divider className="mb-2" />
            <div className="flex w-full flex-row justify-between font-bold">
              <span className="text-sm">Total (PHP)</span>
              <span className="text-sm">₱ {listing.price * nights}</span>
            </div>
          </div>
          <ThankYouModal size="md" isOpen={isOpen} onClose={onClose} />
        </div>
      )}
    </div>
  );
};

export default AccommodationBookingConfirm;

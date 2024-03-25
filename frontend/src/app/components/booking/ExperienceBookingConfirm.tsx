"use client";
import { Button, Divider } from "@nextui-org/react";
import React from "react";
import ChevronLeftIcon from "../svgs/Calendar/ChevronLeftIcon";
import { useRouter, useSearchParams } from "next/navigation";
import type { Listing_Experience } from "@/app/interfaces/types";
import Image from "next/image";

interface ExperienceBookingConfirmProps {
  listing: Listing_Experience;
}
const ExperienceBookingConfirm: React.FC<ExperienceBookingConfirmProps> = ({
  listing
}) => {
  const searchParam = useSearchParams();
  const guests = Number(searchParam.get("guests"));
  const date = new Date(searchParam.get("date") as string);
  const router = useRouter();

  function isInvalid(): boolean {
    return (
      guests < 1 ||
      (date.getTime() < new Date().getTime() &&
        date.setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0)) ||
      guests > listing.maximum_guests ||
      isNaN(guests) ||
      isNaN(date.valueOf())
    );
  }
  return (
    <div className="p-2">
      {isInvalid() ? (
        <></>
      ) : (
        <div className="flex flex-row">
          <div className="w-1/2">
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
              <span className="text-xl font-bold">Request to book</span>
            </div>
            <div className="flex flex-col p-5 pl-10">
              <div className="mb-10">
                <span className="text-md font-bold">Your experience</span>
              </div>
              <div className="mb-2">
                <span className="text-md font-bold">Date</span>
              </div>
              <div className="mb-10">
                <span className="text-md">
                  {date.toDateString().split(" ")[0] +
                    ", " +
                    date.toDateString().split(" ")[1] +
                    " " +
                    date.getDate()}
                </span>
              </div>
              <div className="mb-2">
                <span className="text-md font-bold">Guests</span>
              </div>
              <div className="mb-10">
                <span className="text-md">{guests}</span>
              </div>
              <Button
                size="lg"
                className="w-3/4"
                color="primary"
                isDisabled={isInvalid()}
              >
                Book
              </Button>
            </div>
          </div>
          <div className="flex w-1/2 flex-col rounded-xl border-1 border-black bg-white p-10">
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
                  ₱ {listing.price} x {guests} guest/s
                </span>
                <span className="text-sm">₱ {listing.price * guests}</span>
              </div>
            </div>
            <Divider className="mb-2" />
            <div className="flex w-full flex-row justify-between font-bold">
              <span className="text-sm">Total (PHP)</span>
              <span className="text-sm">₱ {listing.price * guests}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceBookingConfirm;

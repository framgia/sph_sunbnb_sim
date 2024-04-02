"use client";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import FlagIcon from "../svgs/Report/FlagIcon";
import ChevronDownIcon from "../svgs/Calendar/ChevronDownIcon";
import GuestCounter from "./GuestCounter";
import { DateRange, type Range } from "react-date-range";
import { getDateString } from "@/app/utils/helpers/getDateString";
import addDays from "date-fns/addDays";
import { useRouter } from "next/navigation";
import { isDateBlocked } from "@/app/utils/helpers/booking/DateHelper";

interface AccommodationBookingStickyProps {
  price: number;
  maxGuests: number;
  minNights: number;
  maxNights: number;
  exclude: Date[];
  listingId: number;
}
const AccommodationBookingSticky: React.FC<AccommodationBookingStickyProps> = ({
  price,
  maxGuests,
  minNights,
  maxNights,
  exclude,
  listingId
}) => {
  const [guestCount, setGuests] = useState(1);
  const [startDateState, setStart] = useState(new Date());
  const [endDateState, setEnd] = useState(addDays(new Date(), minNights));
  const [nights, setNights] = useState(1);
  const [dates, setDates] = useState<Range[]>([
    {
      startDate: startDateState,
      endDate: endDateState,
      key: "selection"
    }
  ]);
  const router = useRouter();

  useEffect(() => {
    setNights(endDateState.getDate() - startDateState.getDate());
  }, [startDateState, endDateState]);

  useEffect(() => {
    if (nights > maxNights) {
      setEnd(addDays(startDateState, maxNights));
      setDates([
        {
          startDate: startDateState,
          endDate: addDays(startDateState, maxNights),
          key: "selection"
        }
      ]);
    }
  }, [nights, maxNights, startDateState]);

  return (
    <div className="w-80">
      <div className="mb-1 w-full rounded-xl border border-1 border-black p-5 shadow-lg">
        <div className="mb-5">
          <span className="text-xl font-semibold"> ₱ {price} / night </span>
        </div>

        <div className="mb-10 flex flex-col">
          <div className="mb-2 flex flex-row">
            <Popover placement="bottom">
              <PopoverTrigger>
                <Button className="w-full py-5" variant="bordered">
                  <div className="m-0 flex w-full flex-col border-r-2 p-2">
                    <span className="m-0 w-full p-0 text-start text-xs font-bold">
                      Check-in
                    </span>
                    <span className="w-full pt-0 text-center">
                      {getDateString(startDateState)}
                    </span>
                  </div>
                  <div className="m-0 flex w-full flex-col p-2">
                    <span className="m-0 w-full p-0 text-start text-xs font-bold">
                      Check-out
                    </span>
                    <span className="w-full pt-0 text-center">
                      {nights < 1
                        ? "Add Checkout"
                        : getDateString(endDateState)}
                    </span>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <DateRange
                  onChange={(item) => {
                    if (
                      item.selection.startDate !== undefined &&
                      item.selection.endDate !== undefined
                    ) {
                      setStart(
                        new Date(item.selection.startDate.toUTCString())
                      );
                      setEnd(new Date(item.selection.endDate.toUTCString()));
                    }
                    setDates([item.selection]);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                  rangeColors={["#FF2200"]}
                  disabledDates={exclude}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="mb-2 ">
            <Popover placement="bottom-end">
              <Input
                isReadOnly={true}
                min={1}
                max={maxGuests}
                placeholder="# of Guests"
                value={guestCount > 1 ? guestCount + " guests" : "1 guest"}
                variant="bordered"
                label="GUESTS"
                endContent={
                  <PopoverTrigger>
                    <Button className="bg-white" isIconOnly>
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                }
              />
              <PopoverContent className="my-2 ml-16">
                <div className="flex justify-between">
                  <div className="self-center p-2 text-sm font-semibold">
                    Number of Guests
                  </div>
                  <div>
                    {" "}
                    <GuestCounter
                      max={maxGuests}
                      min={1}
                      value={guestCount}
                      updateValue={setGuests}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Button
            className="w-full font-bold"
            color="primary"
            isDisabled={
              nights < 1 ||
              nights > maxNights ||
              isDateBlocked(startDateState, exclude) ||
              isDateBlocked(endDateState, exclude)
            }
            onPress={() => {
              router.push(
                `${listingId}/checkout?guests=${guestCount}&nights=${nights}&start=${startDateState.toISOString()}`
              );
            }}
          >
            Book
          </Button>
        </div>

        {nights > 0 ? (
          <>
            <div className="mb-5 flex justify-between">
              <div className="underline">
                <span className="text-md">₱ {price}</span>
                <span className="text-sm"> x {nights} nights </span>
              </div>
              <div>
                <span className="text-md font-bold">₱ {price * nights}</span>
              </div>
            </div>

            <div className="flex w-full flex-col">
              <span className="text-center text-xs font-semibold">
                Sunbnb Service Fee
              </span>
              <span className="text-center text-xs font-semibold">
                Included
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-3 flex w-full cursor-pointer flex-row items-center justify-center hover:underline">
        <FlagIcon />{" "}
        <span className="mx-2 text-center text-sm font-semibold">
          Report this listing
        </span>
      </div>
    </div>
  );
};

export default AccommodationBookingSticky;

"use client";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { DateRange, type Range } from "react-date-range";
import ChevronDownIcon from "../svgs/Calendar/ChevronDownIcon";
import GuestCounter from "./GuestCounter";
import FlagIcon from "../svgs/Report/FlagIcon";
import ExperienceBookOption from "./ExperienceBookOption";
import { eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { isDateBlocked } from "@/app/utils/helpers/booking/DateHelper";

interface ExperienceBookingStickyProps {
  price: number;
  startTime: string;
  endTime: string;
  maxGuest: number;
  listingId: number;
  exclude: Date[];
}
const ExperienceBookingSticky: React.FC<ExperienceBookingStickyProps> = ({
  price,
  startTime,
  endTime,
  maxGuest,
  listingId,
  exclude
}) => {
  const [guestCount, setGuestCount] = useState(1);
  const [startDateState, setStart] = useState(new Date());
  const [endDateState, setEnd] = useState(new Date());
  const [slice, setSlice] = useState(3);
  const [dates, setDates] = useState<Range[]>([
    {
      startDate: startDateState,
      endDate: endDateState,
      key: "selection"
    }
  ]);
  const [DateArr, setDateArr] = useState<Date[]>([new Date()]);
  const router = useRouter();
  function getDatesInRange(start: Date, end: Date): Date[] {
    return eachDayOfInterval({
      start: new Date(start),
      end: new Date(end)
    });
  }

  function isEqualDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  useEffect(() => {
    const newArr = getDatesInRange(startDateState, endDateState);
    setDateArr(newArr);
  }, [dates, endDateState, startDateState]);
  return (
    <div className="w-96">
      <div className="mb-1 w-full rounded-xl border border-1 border-black p-5 shadow-lg">
        <div className="mb-5">
          <span className="text-xl font-semibold">From ₱ {price} / Person</span>
        </div>

        <div className="mb-10 flex flex-row">
          <Popover placement="bottom-end">
            <div className="flex w-full flex-row rounded-l-xl border-2 border-r-1">
              <div className="flex w-3/4 flex-col px-5 py-2">
                <span className="text-xs font-bold">Date</span>
                <span className="w-full text-sm">
                  {isEqualDate(startDateState, endDateState)
                    ? startDateState.toDateString().split(" ")[1] +
                      " " +
                      startDateState.getDate()
                    : startDateState.toDateString().split(" ")[1] +
                      " " +
                      startDateState.getDate() +
                      " - " +
                      endDateState.getDate()}
                </span>
              </div>
              <PopoverTrigger>
                <Button
                  className="w-1/4 self-center bg-white"
                  isIconOnly
                  onPress={() => {
                    router.push(`${listingId}/book`);
                  }}
                >
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
            </div>
            <PopoverContent>
              <DateRange
                onChange={(item) => {
                  if (
                    item.selection.startDate !== undefined &&
                    item.selection.endDate !== undefined
                  ) {
                    setStart(new Date(item.selection.startDate.toUTCString()));
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
          <Popover placement="bottom-end">
            <div className="flex w-full flex-row rounded-r-xl border-2 border-l-1">
              <div className="flex w-3/4 flex-col px-5 py-2">
                <span className="text-xs font-bold">Guests</span>
                <span className="w-full text-sm">
                  {guestCount > 1 ? guestCount + " Guests" : "1 Guest"}
                </span>
              </div>
              <PopoverTrigger>
                <Button className="w-1/4 self-center bg-white" isIconOnly>
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
            </div>
            <PopoverContent>
              <div className="flex justify-between">
                <div className="self-center p-2 text-sm font-semibold">
                  Number of Guests
                </div>
                <div>
                  {" "}
                  <GuestCounter
                    max={maxGuest}
                    min={1}
                    value={guestCount}
                    updateValue={setGuestCount}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <>
          {DateArr.length < 3 ? (
            DateArr.map((date, i) => {
              return isDateBlocked(date, exclude) ? (
                <div key={i}></div>
              ) : (
                <ExperienceBookOption
                  key={i}
                  date={date}
                  price={price}
                  startTime={startTime}
                  endTime={endTime}
                  guests={guestCount}
                  listingId={listingId}
                />
              );
            })
          ) : (
            <>
              {DateArr.slice(0, slice).map((date, i) => {
                return (
                  <ExperienceBookOption
                    key={i}
                    date={date}
                    price={price}
                    startTime={startTime}
                    endTime={endTime}
                    guests={guestCount}
                    listingId={listingId}
                  />
                );
              })}
              <div className="flex w-full justify-center">
                {slice < DateArr.length ? (
                  <Button
                    color="primary"
                    onPress={() => {
                      if (slice + 3 < DateArr.length) {
                        setSlice(slice + 3);
                      } else {
                        setSlice(DateArr.length);
                      }
                    }}
                  >
                    Show all Dates
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </>
      </div>
      <div className="flex w-full cursor-pointer flex-row items-center justify-center hover:underline">
        <FlagIcon />{" "}
        <span className="mx-2 text-center text-sm font-semibold">
          Report this listing
        </span>
      </div>
    </div>
  );
};

export default ExperienceBookingSticky;

"use client";
import {
  type AvailabilityListing,
  type AvailabilityCalendarProps
} from "@/app/interfaces/AvailabilityCalendarProps";
import React, { useEffect, useState } from "react";
import ListingsDropdown from "./ListingsDropdown";
import Calendar from "./Calendar";
import AvailabilitySidebar from "./AvailabilitySidebar";
import { getListingAvailability } from "@/app/utils/helpers/availability/requests";
import { type CalendarDate } from "@/app/interfaces/types";

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  listings
}) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [calendarDates, setCalendarDates] = useState<CalendarDate[]>([]);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [onTabChanged, setTabChanged] = useState(false);
  const [selectedListing, setSelectedListing] = useState<AvailabilityListing>(
    listings[0]
  );

  useEffect(() => {
    if (calendarDates !== undefined) {
      setBlockedDates(
        calendarDates
          .filter(({ available }) => !available)
          .map(({ date }) => new Date(date))
      );
    }
  }, [calendarDates]);

  useEffect(() => {
    if (selectedListing !== undefined) {
      const fetchListingAvailability = async (): Promise<void> => {
        const response = await getListingAvailability(selectedListing.id);
        if (response !== undefined) setCalendarDates(response);
      };
      fetchListingAvailability().catch((error) => {
        console.error("Failed to fetch lisitng availability: ", error);
      });
      setTabChanged(false);
    }
  }, [selectedListing, onTabChanged]);

  return (
    <div className="flex min-h-[600px] w-full flex-col-reverse gap-4 md:h-full md:flex-row md:gap-5">
      <div
        className={`${selectedDates.length > 0 ? "px-6 sm:ms-auto" : "sm:m-auto sm:px-6"}
          flex w-full flex-col gap-2 sm:my-5 sm:max-w-[1024px] sm:gap-6
        `}
      >
        <ListingsDropdown
          listings={listings}
          selectedListing={selectedListing}
          onSelect={setSelectedListing}
        />
        <Calendar
          selectedDates={selectedDates}
          blockedDates={blockedDates}
          onSelect={setSelectedDates}
        />
      </div>
      <AvailabilitySidebar
        selectedDates={selectedDates}
        blockedDates={blockedDates}
        selectedListing={selectedListing}
        onTabChange={setTabChanged}
      />
    </div>
  );
};

export default AvailabilityCalendar;

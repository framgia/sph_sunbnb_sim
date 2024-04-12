"use client";
import {
  type AvailabilityListing,
  type AvailabilityCalendarProps
} from "@/app/interfaces/CalendarProps";
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
  const [blockedDates, setBlockedDates] = useState<CalendarDate[]>([]);
  const [onTabChanged, setTabChanged] = useState(false);
  const [selectedListing, setSelectedListing] = useState<AvailabilityListing>(
    listings[0]
  );

  useEffect(() => {
    if (calendarDates !== undefined) {
      setBlockedDates(calendarDates.filter(({ available }) => !available));
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
    <div className="flex w-full flex-col-reverse gap-4 md:h-full md:min-h-[600px] md:flex-row md:flex-row md:gap-5">
      <div
        className={`${selectedDates.length > 0 ? "md:ms-auto" : "md:m-auto"}
          flex w-full flex-col gap-3 md:my-5 md:max-w-[1024px] md:gap-6 md:px-6
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

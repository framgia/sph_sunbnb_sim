"use client";
import { type AvailabilityCalendarProps } from "@/app/interfaces/AvailabilityCalendarProps";
import React, { useState } from "react";
import ListingsDropdown from "./ListingsDropdown";
import Calendar from "./Calendar";
import AvailabilitySidebar from "./AvailabilitySidebar";

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = (props) => {
  const [selectedListing, setSelectedListing] = useState<string>(
    props.listings[0]
  );
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  return (
    <div className="flex w-full flex-col-reverse gap-4 sm:h-full sm:flex-row sm:gap-6">
      <div
        className={`${selectedDates.length > 0 ? "sm:ms-auto sm:pe-0 sm:ps-32" : "sm:m-auto sm:px-24"}
          flex w-full flex-col gap-2 sm:my-5 sm:max-w-[1024px] sm:gap-6
        `}
      >
        <ListingsDropdown
          listings={props.listings}
          selectedListing={selectedListing}
          onSelect={setSelectedListing}
        />
        <Calendar selectedDates={selectedDates} onSelect={setSelectedDates} />
      </div>

      <AvailabilitySidebar selectedDates={selectedDates} />
    </div>
  );
};

export default AvailabilityCalendar;

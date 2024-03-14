import AvailabilityCalendar from "@/app/components/calendar/AvailabilityCalendar";
import { getListingNames } from "@/app/utils/helpers/availabilityHelper";
import React from "react";

const CalendarPage: React.FC = async () => {
  const listings = await getListingNames();

  return (
    <main className="sm:fixed sm:end-0 sm:mt-[-20px] sm:flex sm:h-full sm:w-screen">
      {listings === undefined || listings?.length === 0 ? (
        <p className="mx-auto mt-5 text-center text-gray-500">
          No listings available.
        </p>
      ) : (
        <AvailabilityCalendar listings={listings} />
      )}
    </main>
  );
};

export default CalendarPage;

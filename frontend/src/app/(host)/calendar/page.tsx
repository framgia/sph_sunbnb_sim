import AvailabilityCalendar from "@/app/components/calendar/AvailabilityCalendar";
import { getListingNames } from "@/app/utils/helpers/availability/requests";
import React from "react";

const CalendarPage: React.FC = async () => {
  const listings = await getListingNames();

  return (
    <main className="overflow-y-auto md:fixed md:end-0 md:mt-[-20px] md:flex md:h-full md:w-screen">
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

import AvailabilityCalendar from "@/app/components/calendar/AvailabilityCalendar";
import React from "react";

const CalendarPage: React.FC = () => {
  // TODO: Replace with actual data from the backend
  const listings: string[] = [
    "Cozy Haven Retreat",
    "Urban Oasis Getaway",
    "Serene Skyline Hideaway",
    "Tranquil Treehouse Haven",
    "Seaside Bliss Cottage",
    "Sunny Side Bungalow",
    "Mountain View Manor",
    "Lakeside Tranquility Cottage",
    "Chic City Loft Escape",
    "Garden Grove Getaway"
  ];

  return (
    <main className="sm:fixed sm:end-0 sm:mt-[-20px] sm:flex sm:h-full sm:w-screen">
      {listings.length === 0 ? (
        <p className="text-center text-gray-500">No listings available.</p>
      ) : (
        <AvailabilityCalendar listings={listings} />
      )}
    </main>
  );
};

export default CalendarPage;

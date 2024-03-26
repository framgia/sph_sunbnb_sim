"use server";
import BookingHistoryComponent from "@/app/(guest)/history/BookingHistoryComponent";
import { getBookingHistory } from "@/app/utils/helpers/bookinghistory/request";
import React from "react";

interface BookingHistoryPageProps {
  params: {
    id: string;
  };
}

const HistoryPage: React.FC<BookingHistoryPageProps> = async ({ params }) => {
  const bookings = await getBookingHistory();
  return (
    <div className="w-full">
      <BookingHistoryComponent bookings={bookings} />
    </div>
  );
};

export default HistoryPage;

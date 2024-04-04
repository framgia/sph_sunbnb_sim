"use server";
import BookingHistoryComponent from "@/app/(guest)/history/BookingHistoryComponent";
import ErrorMessage from "@/app/components/ErrorMessage";
import { getBookingHistory } from "@/app/utils/helpers/bookinghistory/request";
import { checkCookies } from "@/app/utils/helpers/userHelper";
import { redirect } from "next/navigation";
import React from "react";

const HistoryPage: React.FC = async ({
  searchParams
}: {
  searchParams?: {
    page?: number;
    size?: number;
    query?: string;
  };
}) => {
  const user = await checkCookies();
  if (user === null || user === undefined) {
    redirect("/not-found");
  }
  const responseData = await getBookingHistory(
    user.id,
    searchParams?.page ?? 1,
    searchParams?.size ?? 5,
    searchParams?.query
  );

  return responseData === undefined || responseData === null ? (
    <>
      <ErrorMessage message={"Error in fetching history"} />
    </>
  ) : (
    <div className="w-full">
      <BookingHistoryComponent
        pagination={responseData.pagination}
        bookings={responseData.bookings}
      />
    </div>
  );
};

export default HistoryPage;

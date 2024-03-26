"use server";
import React from "react";
import { Input, Pagination } from "@nextui-org/react";
import SearchIcon from "../../components/svgs/SearchIcon";
import { BookingHistory } from "../../interfaces/types";
import BookingHistoryData from "./BookingHistoryData";

interface BookingHistoryProps {
  bookings: BookingHistory[];
}

const BookingHistoryComponent: React.FC<BookingHistoryProps> = ({
  bookings
}) => {
  return (
    <>
      <div className="mt-5 font-semibold">Your booking history</div>
      <div className="mb-6 mt-5 flex w-[340px] flex-wrap gap-4 md:mb-0 md:flex-nowrap">
        <Input
          variant="bordered"
          placeholder="Search by name..."
          startContent={
            <SearchIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
          }
        />
      </div>
      <div className="mb-1 mt-10 flex justify-between">
        <div>Total bookings: {bookings.length} </div>
        <div>Rows per page: {bookings.length} </div>
      </div>
      <div className="grid h-[50px] grid-cols-[10%_20%_15%_15%_10%_15%_15%] rounded-lg bg-primary-600 text-sm">
        <div className="col-span-2 flex items-center justify-center px-5 text-white">
          LISTING
        </div>
        <div className="flex items-center justify-center text-white">
          CHECK-IN DATE
        </div>
        <div className="flex items-center justify-center text-white">
          CHECK-OUT DATE
        </div>
        <div className="flex items-center justify-center text-white">PRICE</div>
        <div className="flex items-center justify-center text-white">
          STATUS
        </div>
        <div className="flex items-center justify-center text-white">
          ACTIONS
        </div>
      </div>
      {bookings.map((booking, i) => (
        <BookingHistoryData
          key={i}
          id={booking.id}
          type={
            booking.listing.listable_type.includes("Accommodation")
              ? "accommodation"
              : "experience"
          }
          name={booking.listing.name}
          checkinDate={booking.start_date}
          checkoutDate={booking.end_date}
          price={booking.listing.price}
          status={booking.status as string}
          image={""}
        />
      ))}

      <Pagination
        className="flex justify-center"
        isCompact
        showControls
        total={1}
        initialPage={1}
      />
    </>
  );
};

export default BookingHistoryComponent;

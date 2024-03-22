import React from "react";
import { Input, Pagination } from "@nextui-org/react";
import SearchIcon from "./svgs/SearchIcon";
import BookingStatus from "./BookingStatus"; // Import the BookingStatus component

const dummyData = [
  {
    name: "Seaside Cottage",
    media: "https://example.com/seaside_cottage_image",
    checkinDate: "April 10, 2024",
    checkoutDate: "April 15, 2024",
    bill: 750.0,
    status: "Upcoming"
  },
  {
    name: "Mountain Cabin",
    media: "https://example.com/mountain_cabin_image",
    checkinDate: "May 5, 2024",
    checkoutDate: "May 10, 2024",
    bill: 600.0,
    status: "Done"
  },
  {
    name: "City Apartment",
    media: "https://example.com/city_apartment_image",
    checkinDate: "June 20, 2024",
    checkoutDate: "June 25, 2024",
    bill: 900.0,
    status: "Pending"
  },
  {
    name: "Magical Location",
    media: "https://example.com/city_apartment_image",
    checkinDate: "June 20, 2024",
    checkoutDate: "June 25, 2024",
    bill: 900.0,
    status: "Cancelled"
  }
];

const BookingHistory: React.FC = () => {
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
        <div>Total bookings: {dummyData.length} </div>
        <div>Rows per page: {dummyData.length} </div>
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
      {dummyData.map((booking, index) => (
        <div
          key={index}
          className="my-8 flex grid h-[50px] grid-cols-[10%_20%_15%_15%_10%_15%_15%] items-center  rounded-lg py-3"
        >
          <div>{/* insert image here */}</div>
          <div className="flex items-center px-5">{booking.name}</div>
          <div className="flex items-center justify-center">
            {booking.checkinDate}
          </div>
          <div className="flex items-center justify-center">
            {booking.checkoutDate}
          </div>
          <div className="flex items-center justify-center px-12">
            {booking.bill}
          </div>
          <BookingStatus status={booking.status} />
        </div>
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

export default BookingHistory;

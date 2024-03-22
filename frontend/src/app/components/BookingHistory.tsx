import { Input, Button, Chip, Pagination } from "@nextui-org/react";
import React from "react";
import SearchIcon from "./svgs/SearchIcon";

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
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-300 text-indigo-500";
      case "Cancelled":
        return "bg-danger-200 text-red-500";
      case "Done":
        return "bg-success-200 text-green-500";
      case "Pending":
        return "bg-warning-200 text-yellow-500";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getAction = (status: string): JSX.Element => {
    switch (status) {
      case "Upcoming":
        return (
          <Button
            size="sm"
            color="primary"
            className="text-md rounded-full px-5 font-bold"
          >
            Cancel
          </Button>
        );
      case "Cancelled":
        return (
          <Button
            size="sm"
            color="primary"
            variant="bordered"
            className="text-md rounded-full px-5 font-bold"
          >
            Delete
          </Button>
        );
      case "Done":
        return (
          <Button
            size="sm"
            color="primary"
            className="text-md rounded-full px-5 font-bold"
          >
            Review
          </Button>
        );
      case "Pending":
        return (
          <Button
            size="sm"
            color="primary"
            variant="bordered"
            className="text-md rounded-full px-5 font-bold"
          >
            Cancel
          </Button>
        );
      default:
        return <></>;
    }
  };

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
          <div className="flex w-full items-center justify-center">
            <Chip
              className={`w-full rounded-full border p-2 text-center font-semibold ${getStatusColor(booking.status)}`}
              size="lg"
            >
              {booking.status}
            </Chip>
          </div>

          <div className="flex items-center justify-center">
            {getAction(booking.status)}
          </div>
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

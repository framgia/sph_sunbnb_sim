import BookingStatusComponent from "@/app/components/BookingStatus";
import type { BookingHistory } from "@/app/interfaces/types";
import { Image } from "@nextui-org/react";
import React from "react";

interface BookingHistoryDataProps {
  id: number;
  type: "accommodation" | "experience";
  name: string;
  checkinDate: string;
  checkoutDate: string;
  price: number;
  status: string;
  image: string;
  bookings: BookingHistory[];
  listingid: number;
  reviewed: boolean;
  setbookings: (bookings: BookingHistory[]) => void;
}

const BookingHistoryData: React.FC<BookingHistoryDataProps> = ({
  id,
  type,
  name,
  checkinDate,
  checkoutDate,
  price,
  status,
  image,
  listingid,
  bookings,
  reviewed,
  setbookings
}) => {
  return (
    <>
      <div className="my-8 flex grid h-[50px] grid-cols-[10%_20%_15%_15%_10%_15%_15%] items-center  rounded-lg py-3">
        <div className="flex items-center justify-end">
          <div className="h-14 w-14 overflow-hidden rounded-xl ">
            <div className="flex h-14 justify-center ">
              <Image src={image} alt={name} className="h-full rounded-none" />
            </div>
          </div>
        </div>
        <div className="flex items-center px-5">{name}</div>
        <div className="flex items-center justify-center">{checkinDate}</div>
        <div className="flex items-center justify-center">{checkoutDate}</div>
        <div className="flex items-center justify-center px-12">₱{price}</div>
        <BookingStatusComponent
          status={status}
          id={id}
          type={type}
          bookings={bookings}
          setbookings={setbookings}
          listingid={listingid}
          reviewed={reviewed}
        />
      </div>
    </>
  );
};

export default BookingHistoryData;

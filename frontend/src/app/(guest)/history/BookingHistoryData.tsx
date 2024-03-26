import BookingStatus from "@/app/components/BookingStatus";
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
}

const BookingHistoryData: React.FC<BookingHistoryDataProps> = ({
  id,
  type,
  name,
  checkinDate,
  checkoutDate,
  price,
  status
}) => {
  return (
    <>
      <div className="my-8 flex grid h-[50px] grid-cols-[10%_20%_15%_15%_10%_15%_15%] items-center  rounded-lg py-3">
        <div>{/* insert image here */}</div>
        <div className="flex items-center px-5">{name}</div>
        <div className="flex items-center justify-center">{checkinDate}</div>
        <div className="flex items-center justify-center">{checkoutDate}</div>
        <div className="flex items-center justify-center px-12">{price}</div>
        <BookingStatus status={status} id={id} type={type} />
      </div>
    </>
  );
};

export default BookingHistoryData;

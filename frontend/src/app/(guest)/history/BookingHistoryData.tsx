import BookingStatusComponent from "@/app/components/BookingStatus";
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
  listingid: number;
  reviewed: boolean;
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
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
  reviewed,
  setActionDone
}) => {
  return (
    <>
      <div className="my-5 grid h-12 min-w-[700px] grid-cols-7 items-center gap-1 rounded-lg text-sm">
        <div className="flex w-full justify-center">
          <div className="w-14 self-end rounded-xl bg-zinc-50">
            <Image src={image} alt={name} className="h-14" />
          </div>
        </div>
        <div>{name}</div>
        <div className="flex items-center justify-center">
          {new Date(checkinDate).toDateString()}
        </div>
        <div className="flex items-center justify-center">
          {new Date(checkoutDate).toDateString()}
        </div>
        <div className="flex items-center justify-center px-12">₱{price}</div>
        <BookingStatusComponent
          status={status}
          id={id}
          type={type}
          setActionDone={setActionDone}
          listingid={listingid}
          reviewed={reviewed}
        />
      </div>
    </>
  );
};

export default BookingHistoryData;

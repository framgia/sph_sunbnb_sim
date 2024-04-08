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
      <div className="my-5 grid h-[50px] grid-cols-[10%_20%_15%_15%_10%_15%_15%] items-center rounded-lg py-3 text-sm">
        <div className="flex items-center justify-end">
          <div className="h-14 w-14 overflow-hidden rounded-xl ">
            <div className="flex h-14 justify-center ">
              <Image src={image} alt={name} className="h-full rounded-none" />
            </div>
          </div>
        </div>
        <div className="flex items-center px-5">{name}</div>
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

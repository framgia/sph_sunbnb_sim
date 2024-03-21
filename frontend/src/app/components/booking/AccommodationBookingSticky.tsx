import { Button, Input } from "@nextui-org/react";
import React from "react";
import FlagIcon from "../svgs/Report/FlagIcon";

interface AccommodationBookingStickyProps {
  price: number;
  maxGuests: number;
  minNights: number;
  maxNights: number;
}
const AccommodationBookingSticky: React.FC<AccommodationBookingStickyProps> = ({
  price,
  maxGuests,
  minNights,
  maxNights
}) => {
  return (
    <div className="w-80">
      <div className="mb-1 w-full rounded-xl border border-1 border-black p-5 shadow-lg">
        <div className="mb-5">
          <span className="text-xl font-semibold"> ₱ {price} night </span>
        </div>

        <div className="mb-10 flex flex-col">
          <div className="mb-2 flex flex-row">
            <Input className="mr-1" variant="bordered" label="CHECK-IN" />
            <Input className="ml-1" variant="bordered" label="CHECK-OUT" />
          </div>
          <div className="mb-2">
            <Input
              type="number"
              min={1}
              max={maxGuests}
              variant="bordered"
              label="GUESTS"
            />
          </div>
          <Button className="w-full font-bold" color="primary">
            Book
          </Button>
        </div>

        <div className="mb-5 flex justify-between">
          <div>
            <span className="text-lg underline">₱ {price}</span>
            <span className="text-md"> x 5 nights </span>
          </div>
          <div>
            <span className="text-lg">₱ {price * 5}</span>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <span className="text-center text-lg font-semibold">
            Sunbnb Service Fee
          </span>
          <span className="text-center text-lg font-semibold">Included</span>
        </div>
      </div>
      <div className="flex w-full cursor-pointer flex-row items-center justify-center hover:underline">
        <FlagIcon />{" "}
        <span className="mx-2 text-center text-sm font-semibold">
          Report this listing
        </span>
      </div>
    </div>
  );
};

export default AccommodationBookingSticky;

import React from "react";
import TrashIcon from "../../svgs/TrashIcon";
import RejectIcon from "../../svgs/Booking/RejectIcon";
import AcceptIcon from "../../svgs/Booking/AcceptIcon";
import { Button } from "@nextui-org/react";

const BookingActions: React.FC<{ status: string }> = ({ status }) => {
  return (
    <>
      {status === "done" || status === "cancelled" || status === "refused" ? (
        <Button className="bg-white text-danger-500" isIconOnly>
          <TrashIcon />
        </Button>
      ) : status === "pending" ? (
        <div className="flex flex-row justify-between">
          <Button className="bg-white text-success-500" isIconOnly>
            <AcceptIcon />
          </Button>
          <Button className="bg-white text-danger-500" isIconOnly>
            <RejectIcon />
          </Button>
        </div>
      ) : (
        <Button className="bg-white text-danger-500" isIconOnly>
          <RejectIcon />
        </Button>
      )}
    </>
  );
};

export default BookingActions;

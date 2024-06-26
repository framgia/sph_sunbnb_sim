import React, { useState } from "react";
import TrashIcon from "../../svgs/TrashIcon";
import RejectIcon from "../../svgs/Booking/RejectIcon";
import AcceptIcon from "../../svgs/Booking/AcceptIcon";
import { Button, Tooltip } from "@nextui-org/react";
import {
  bookingAction,
  cancelBooking
} from "@/app/utils/helpers/bookingmanagement/request";

interface BookingActionsProps {
  status: string;
  id: number;
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookingActions: React.FC<BookingActionsProps> = ({
  status,
  id,
  setActionDone
}) => {
  const [isLoading, setIsLoading] = useState(false);
  async function handleAccept(): Promise<void> {
    setIsLoading(true);
    const result = await bookingAction(id, "approve");
    setIsLoading(false);
    if (result.hasError === true) {
      console.error(result.message);
    } else {
      setActionDone((prev) => !prev);
    }
  }
  async function handleReject(): Promise<void> {
    setIsLoading(true);
    const result = await bookingAction(id, "refuse");
    setIsLoading(false);
    if (result.hasError === true) {
      console.error(result.message);
    } else {
      setActionDone((prev) => !prev);
    }
  }
  async function handleCancel(): Promise<void> {
    setIsLoading(true);
    const result = await cancelBooking(id);
    setIsLoading(false);
    if (result.hasError === true) {
      console.error(result.message);
    } else {
      setActionDone((prev) => !prev);
    }
  }
  return (
    <>
      {status === "Done" || status === "Cancelled" || status === "Refused" ? (
        <Tooltip content="Remove" placement="right-end">
          <Button
            className="bg-white text-danger-500"
            isIconOnly
            onClick={handleCancel}
            isDisabled={isLoading}
          >
            <TrashIcon />
          </Button>
        </Tooltip>
      ) : status === "Pending" ? (
        <div className="flex flex-row justify-between">
          <Tooltip content="Accept" placement="right-end">
            <Button
              className="bg-white text-success-500"
              isIconOnly
              onClick={handleAccept}
              isDisabled={isLoading}
            >
              <AcceptIcon />
            </Button>
          </Tooltip>
          <Tooltip content="Reject" placement="right-end">
            <Button
              className="bg-white text-danger-500"
              isIconOnly
              isDisabled={isLoading}
              onClick={handleReject}
            >
              <RejectIcon />
            </Button>
          </Tooltip>
        </div>
      ) : (
        <Tooltip content="Reject" placement="right-end">
          <Button
            className="bg-white text-danger-500"
            isIconOnly
            isDisabled={isLoading}
            onClick={handleReject}
          >
            <RejectIcon />
          </Button>
        </Tooltip>
      )}
    </>
  );
};

export default BookingActions;

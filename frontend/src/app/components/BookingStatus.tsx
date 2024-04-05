"use client";
import React from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import {
  deleteBooking,
  updateBooking
} from "../utils/helpers/bookinghistory/request";
import ReviewModal from "./review/AddReviewModal";
import StatusChip from "./StatusChip";

interface BookingStatusProps {
  status: string;
  id: number;
  type: "accommodation" | "experience";
  listingid: number;
  reviewed: boolean;
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookingStatusComponent: React.FC<BookingStatusProps> = ({
  status,
  id,
  type,
  listingid,
  reviewed,
  setActionDone
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelButtonClick = async (): Promise<void> => {
    try {
      await updateBooking(id);
      setActionDone((prev) => !prev);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const deleteButtonClick = async (): Promise<void> => {
    try {
      await deleteBooking(id);
      setActionDone((prev) => !prev);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const getAction = (status: string): React.JSX.Element => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return (
          <Button
            size="sm"
            color="primary"
            radius="full"
            onClick={cancelButtonClick}
          >
            Cancel
          </Button>
        );
      case "cancelled":
        return (
          <Button
            size="sm"
            color="primary"
            variant="bordered"
            radius="full"
            onClick={deleteButtonClick}
          >
            Delete
          </Button>
        );
      case "refused":
        return (
          <Button
            size="sm"
            color="primary"
            variant="bordered"
            radius="full"
            onClick={deleteButtonClick}
          >
            Delete
          </Button>
        );
      case "done":
        return (
          <>
            {reviewed ? (
              <Button
                size="sm"
                color="primary"
                variant="bordered"
                radius="full"
                onClick={deleteButtonClick}
              >
                Delete
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  color="primary"
                  radius="full"
                  onClick={onOpen}
                >
                  Review
                </Button>
                <ReviewModal
                  listingId={listingid}
                  listingType={type}
                  size="lg"
                  onClose={onClose}
                  isOpen={isOpen}
                  bookingId={id}
                />
              </>
            )}
          </>
        );
      case "pending":
        return (
          <Button
            size="sm"
            color="primary"
            variant="bordered"
            radius="full"
            onClick={cancelButtonClick}
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
      <div className="flex w-full items-center justify-center">
        <StatusChip status={status} />
      </div>
      <div className="flex w-full items-center justify-center">
        {getAction(status)}
      </div>
    </>
  );
};

export default BookingStatusComponent;

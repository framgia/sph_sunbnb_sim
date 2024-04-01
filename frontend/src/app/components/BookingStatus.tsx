"use client";
import React from "react";
import { Button, Chip, useDisclosure } from "@nextui-org/react";
import {
  deleteBooking,
  updateBooking
} from "../utils/helpers/bookinghistory/request";
import type { BookingHistory } from "../interfaces/types";
import { BookingStatus } from "../utils/enums";
import ReviewModal from "./review/AddReviewModal";

interface BookingStatusProps {
  status: string;
  id: number;
  type: "accommodation" | "experience";
  bookings: BookingHistory[];
  listingid: number;
  reviewed: boolean;
  setbookings: (bookings: BookingHistory[]) => void;
}

const BookingStatusComponent: React.FC<BookingStatusProps> = ({
  status,
  id,
  type,
  bookings,
  listingid,
  reviewed,
  setbookings
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-blue-300 text-indigo-500";
      case "cancelled":
        return "bg-danger-200 text-red-500";
      case "done":
        return "bg-success-200 text-green-500";
      case "pending":
        return "bg-warning-200 text-yellow-500";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const cancelButtonClick = async (): Promise<void> => {
    try {
      await updateBooking(id);
      const bookingIndex = bookings.findIndex((booking) => booking.id === id);
      bookings[bookingIndex].status = BookingStatus.CANCELLED;
      setbookings([...bookings]);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const deleteButtonClick = async (): Promise<void> => {
    try {
      await deleteBooking(id);
      const bookingIndex = bookings.findIndex((booking) => booking.id === id);
      bookings.splice(bookingIndex, 1);
      setbookings([...bookings]);
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
            className="text-md rounded-full px-5 font-bold"
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
            className="text-md rounded-full px-5 font-bold"
            onClick={deleteButtonClick}
          >
            Delete
          </Button>
        );
      case "done":
        return (
          <>
            {reviewed ? null : (
              <>
                <Button
                  size="sm"
                  color="primary"
                  className="text-md rounded-full px-5 font-bold"
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
            className="text-md rounded-full px-5 font-bold"
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
        <Chip
          className={`w-full rounded-full border p-2 text-center font-semibold ${getStatusColor(
            status
          )}`}
          size="lg"
        >
          {status}
        </Chip>
      </div>
      <div className="flex w-full items-center justify-center">
        {getAction(status)}
      </div>
    </>
  );
};

export default BookingStatusComponent;

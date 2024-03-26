import React from "react";
import { Button, Chip } from "@nextui-org/react";

interface BookingStatusProps {
  status: string;
  id: number;
  type: "accommodation" | "experience";
}

const BookingStatus: React.FC<BookingStatusProps> = ({ status, id, type }) => {
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

  const getAction = (status: string): React.JSX.Element => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return (
          <Button
            size="sm"
            color="primary"
            className="text-md rounded-full px-5 font-bold"
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
          >
            Delete
          </Button>
        );
      case "done":
        return (
          <Button
            size="sm"
            color="primary"
            className="text-md rounded-full px-5 font-bold"
          >
            Review
          </Button>
        );
      case "pending":
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

export default BookingStatus;

import { Chip } from "@nextui-org/react";
import React from "react";

const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  const getColor = (
    status: string
  ): "default" | "primary" | "success" | "warning" | "secondary" | "danger" => {
    switch (status.toLowerCase()) {
      case "cancelled":
        return "danger";
      case "done":
        return "success";
      case "pending":
        return "warning";
      case "refused":
        return "secondary";
      case "active":
        return "success";
      case "rejected":
        return "warning";
      default:
        return "default";
    }
  };
  return (
    <Chip
      color={status !== "upcoming" ? getColor(status) : "default"}
      className={
        status.toLowerCase() === "upcoming" ? "bg-blue-300 text-blue-600" : ""
      }
      size="sm"
      radius="lg"
      variant="flat"
    >
      {status[0].toUpperCase() + status.slice(1).toLowerCase()}
    </Chip>
  );
};

export default StatusChip;

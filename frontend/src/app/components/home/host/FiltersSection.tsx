"use client";
import type { BookingFilters } from "@/app/interfaces/types";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input
} from "@nextui-org/react";
import React from "react";
import ChevronDownIcon from "../../svgs/Calendar/ChevronDownIcon";
import { BookingStatus } from "@/app/utils/enums";
import SearchIcon from "../../svgs/SearchIcon";

interface BookingtFilterSectionProps {
  filters: BookingFilters;
  setFilters: React.Dispatch<React.SetStateAction<BookingFilters>>;
}

const BookingtFilterSection: React.FC<BookingtFilterSectionProps> = ({
  filters,
  setFilters
}) => {
  return (
    <div className="flex gap-3">
      <Input
        size="sm"
        className="w-full"
        classNames={{
          inputWrapper: "h-10"
        }}
        placeholder="Search by name..."
        variant="bordered"
        value={filters.search}
        onChange={(e) => {
          setFilters({ ...filters, search: e.target.value });
        }}
        startContent={<SearchIcon height={15} width={15} />}
      />
      <div className="flex flex-row items-center">
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="w-32"
              variant="solid"
              color="primary"
              endContent={<ChevronDownIcon />}
            >
              {filters.status[0].toUpperCase() +
                filters.status.slice(1).toLowerCase()}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Booking Status Filter"
            onAction={(key) => {
              setFilters({ ...filters, status: key as string });
            }}
          >
            <DropdownItem key={BookingStatus.DONE}>Done</DropdownItem>
            <DropdownItem key={BookingStatus.PENDING}>Pending</DropdownItem>
            <DropdownItem key={BookingStatus.REFUSED}>Refused</DropdownItem>
            <DropdownItem key={BookingStatus.UPCOMING}>Upcoming</DropdownItem>
            <DropdownItem key={BookingStatus.CANCELLED}>Cancelled</DropdownItem>
            <DropdownItem key={"status"}>All</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default BookingtFilterSection;

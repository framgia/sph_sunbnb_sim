"use client";
import type { BookingFilters, Listing } from "@/app/interfaces/types";
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
import { truncate } from "@/app/utils/string";

interface BookingtFilterSectionProps {
  user: "guest" | "host";
  currentListing?: string;
  listings?: Listing[];
  onSetListing?: (id: number) => void;
  filters: BookingFilters;
  setFilters: React.Dispatch<React.SetStateAction<BookingFilters>>;
}

const BookingtFilterSection: React.FC<BookingtFilterSectionProps> = ({
  user,
  currentListing,
  listings,
  onSetListing,
  filters,
  setFilters
}) => {
  return (
    <div
      className={`flex gap-3 ${user === "host" ? "flex-col md:flex-row" : "flex-row"}`}
    >
      <Input
        size="sm"
        className="w-full md:w-1/4"
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
      <div className="flex flex-row gap-3">
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
        {user === "host" &&
        listings !== undefined &&
        onSetListing !== undefined ? (
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="w-60"
                variant="solid"
                color="primary"
                endContent={<ChevronDownIcon />}
              >
                {listings.length > 0 ? (
                  <p className="truncate">
                    {truncate(
                      listings.find(
                        (item) => item.id === Number(currentListing)
                      )?.name ?? "",
                      25
                    )}
                  </p>
                ) : (
                  "No Active Listing"
                )}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="listings"
              className="max-h-52 w-60 overflow-y-auto overflow-x-hidden"
              onAction={(key) => {
                onSetListing(key as number);
              }}
            >
              {listings.map((listing) => (
                <DropdownItem key={listing.id} textValue={listing.name}>
                  <span className="line-clamp-1 w-full">{listing.name}</span>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        ) : null}
      </div>
    </div>
  );
};

export default BookingtFilterSection;

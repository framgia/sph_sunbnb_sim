"use client";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import StatusChip from "../../StatusChip";
import BookingActions from "./BookingActions";
import type {
  BookingType,
  BookingFilters,
  Listing,
  PaginationType
} from "@/app/interfaces/types";
import { getInitials } from "@/app/utils/helpers/getInitials";
import ChevronDownIcon from "../../svgs/Calendar/ChevronDownIcon";
import { getListingBookings } from "@/app/utils/helpers/bookingmanagement/request";
import BookingtFilterSection from "./FiltersSection";
import { formatCurrency } from "@/app/utils/currency";

const ListingBookingsTable: React.FC<{
  listings: Listing[];
}> = ({ listings }) => {
  const [filters, setFilters] = useState<BookingFilters>({
    status: "status",
    search: "",
    per_page: "5",
    sort: "desc"
  });
  const [currentListing, setListing] = useState(listings[0]?.id ?? 0);
  const [actionDone, setActionDone] = useState(false);
  const [bookingData, setBookingData] = useState<BookingType[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    current_page: 1,
    per_page: 5,
    total: 1,
    next_page_url: "",
    path: "",
    prev_page_url: "",
    to: 1
  });
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const data = await getListingBookings(currentListing, filters, page);
      if (data !== undefined) {
        setPagination(data.pagination);
        setBookingData(data.bookings);
      }
    }
    fetchData().catch((error) => {
      console.error("Failed to get bookings from listing: ", error);
    });
  }, [currentListing, filters, actionDone, page]);

  return (
    <div>
      <div className="mb-2">
        <BookingtFilterSection
          filters={filters}
          setFilters={setFilters}
          user="host"
          currentListing={currentListing.toString()}
          listings={listings}
          onSetListing={setListing}
        />
      </div>
      <div className="mb-2 mt-5 flex flex-row items-center justify-between">
        <div className="ps-1 text-xs text-default-500">
          <span>Total {bookingData.length} Guests</span>
        </div>
        <div className="flex md:gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="sm"
                className="gap-1 bg-white px-1 text-xs text-default-500"
                endContent={<ChevronDownIcon />}
              >
                Sort by: {filters.sort === "desc" ? " Newest" : " Oldest"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Sort Selection"
              onAction={(key) => {
                setFilters({ ...filters, sort: key as string });
              }}
            >
              <DropdownItem key="desc">Newest</DropdownItem>
              <DropdownItem key="asc">Oldest</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="sm"
                className="gap-1 bg-white px-1 text-xs text-default-500"
                endContent={<ChevronDownIcon />}
              >
                Rows per page: {pagination.per_page}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Per Page Selection"
              onAction={(key) => {
                setFilters({ ...filters, per_page: key as string });
              }}
            >
              <DropdownItem key={3}>3</DropdownItem>
              <DropdownItem key={5}>5</DropdownItem>
              <DropdownItem key={8}>8</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="flex flex-col overflow-auto pb-2">
        <div className="grid h-10 min-w-[800px] grid-cols-9 items-center gap-1 rounded-lg bg-primary-600 text-center text-sm text-white">
          <div className="col-span-3">NAME</div>
          <div>CHECK-IN</div>
          <div>CHECK-OUT</div>
          <div>GUESTS</div>
          <div>BILL</div>
          <div>STATUS</div>
          <div>ACTION</div>
        </div>
        {bookingData.length > 0 &&
          bookingData.map((book, i) => {
            return (
              <div
                className="my-5 grid h-12 min-w-[800px] grid-cols-9 items-center gap-1 rounded-lg text-sm"
                key={i}
              >
                <div className="col-span-3 flex grid grid-cols-[25%_80%] gap-2 md:gap-0">
                  <div className="flex w-full justify-end md:justify-center">
                    <Avatar
                      size="sm"
                      name={getInitials(
                        book.user.first_name + " " + book.user.last_name
                      )}
                    />
                  </div>
                  <div>
                    <div className="font-semibold">
                      {book.user.first_name + " " + book.user.last_name}
                    </div>
                    <div className="text-xs">{book.user.email}</div>
                  </div>
                </div>
                <div>{new Date(book.start_date).toDateString()}</div>
                <div className="flex items-center justify-center">
                  {new Date(book.end_date).toDateString()}
                </div>
                <div className="flex items-center justify-center">
                  {book.number_of_guests}
                </div>
                <div className="flex items-center justify-center">
                  {formatCurrency("PHP", 2, book.total_price)}
                </div>
                <div className="flex items-center justify-center">
                  <StatusChip status={book.status} />
                </div>
                <div className="flex items-center justify-center">
                  <BookingActions
                    status={book.status}
                    id={book.id}
                    setActionDone={setActionDone}
                  />
                </div>
              </div>
            );
          })}
      </div>
      {bookingData.length > 0 ? (
        <Pagination
          isCompact
          className="m-3 flex justify-center"
          showControls
          showShadow
          color="primary"
          page={pagination.current_page}
          total={Math.ceil(pagination.total / pagination.per_page)}
          onChange={(page) => {
            setPage(page);
          }}
        />
      ) : (
        <p className="mx-auto mt-5 text-center text-zinc-500">
          No bookings to display.
        </p>
      )}
    </div>
  );
};

export default ListingBookingsTable;

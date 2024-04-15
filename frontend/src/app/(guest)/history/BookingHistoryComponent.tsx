"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination
} from "@nextui-org/react";
import type {
  BookingFilters,
  BookingHistory,
  PaginationType
} from "../../interfaces/types";
import BookingHistoryData from "./BookingHistoryData";
import ChevronDownIcon from "@/app/components/svgs/Calendar/ChevronDownIcon";
import BookingtFilterSection from "@/app/components/home/host/FiltersSection";
import { getBookingHistory } from "@/app/utils/helpers/bookinghistory/request";

interface BookingHistoryProps {
  id: number;
}

const BookingHistoryComponent: React.FC<BookingHistoryProps> = ({
  id: userId
}) => {
  const [filters, setFilters] = useState<BookingFilters>({
    status: "status",
    search: "",
    per_page: "5",
    sort: "desc"
  });
  const [actionDone, setActionDone] = useState(false);
  const [bookingData, setBookingData] = useState<BookingHistory[]>([]);
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
      const data = await getBookingHistory(userId, filters, page);
      if (data !== undefined) {
        setPagination(data.pagination);
        setBookingData(data.bookings);
      }
    }
    fetchData().catch((error) => {
      console.error("Failed to get bookings from listing: ", error);
    });
  }, [userId, filters, actionDone, page]);

  return (
    <>
      <div className="my-5 font-semibold">Your booking history</div>
      <BookingtFilterSection filters={filters} setFilters={setFilters} />
      <div className="mb-2 mt-5 flex flex-row items-center justify-between">
        <div className="px-1 text-xs text-default-500">
          <span>Total {pagination.total} Bookings</span>
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
        <div className="grid h-10 min-w-[700px] grid-cols-7 items-center gap-1 rounded-lg bg-primary-600 text-center text-sm text-white">
          <div className="col-span-2">LISTING</div>
          <div>CHECK-IN</div>
          <div>CHECK-OUT</div>
          <div>PRICE</div>
          <div>STATUS</div>
          <div>ACTIONS</div>
        </div>
        {bookingData.length > 0 &&
          bookingData.map((booking, i) =>
            booking.listing !== null ? (
              <BookingHistoryData
                key={i}
                id={booking.id}
                listingid={booking.listing.id}
                type={
                  booking.listing.listable_type.includes("Accommodation")
                    ? "accommodation"
                    : "experience"
                }
                name={booking.listing.name}
                checkinDate={booking.start_date}
                checkoutDate={booking.end_date}
                price={booking.listing.price}
                status={booking.status as string}
                image={booking.listing.media[0].media}
                reviewed={booking.reviewed}
                setActionDone={setActionDone}
              />
            ) : null
          )}
      </div>
      {bookingData.length > 0 ? (
        <Pagination
          className="mt-2 flex justify-center"
          isCompact
          showControls
          total={Math.ceil(pagination.total / pagination.per_page)}
          initialPage={1}
          page={page}
          onChange={(page) => {
            setPage(page);
          }}
        />
      ) : (
        <p className="mx-auto mt-5 text-center text-zinc-500">
          No bookings found.
        </p>
      )}
    </>
  );
};

export default BookingHistoryComponent;

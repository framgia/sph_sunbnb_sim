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
      <div className="mt-5 font-semibold">Your booking history</div>
      <div className="flex">
        <BookingtFilterSection filters={filters} setFilters={setFilters} />
      </div>
      <div className="mb-1 mt-4 flex justify-between text-xs text-default-500">
        <div className="flex">
          <span className="flex self-center">
            Total bookings: {pagination.total}
          </span>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center text-xs text-default-500">
            <span>
              Sort by: {filters.sort === "desc" ? " Newest" : " Oldest"}
            </span>
            <Dropdown>
              <DropdownTrigger>
                <Button className="bg-white" isIconOnly>
                  <ChevronDownIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="status"
                onAction={(key) => {
                  setFilters({ ...filters, sort: key as string });
                }}
              >
                <DropdownItem key="desc">Newest</DropdownItem>
                <DropdownItem key="asc">Oldest</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex flex-row">
            <span className="flex items-center text-xs text-default-500">
              Rows per page: {pagination.per_page}
            </span>
            <Dropdown>
              <DropdownTrigger>
                <Button className="bg-white" isIconOnly>
                  <ChevronDownIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
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
      </div>
      <div className="grid h-[50px] grid-cols-[10%_20%_15%_15%_10%_15%_15%] rounded-lg bg-primary-600 text-sm">
        <div className="col-span-2 flex items-center justify-center px-5 text-white">
          LISTING
        </div>
        <div className="flex items-center justify-center text-white">
          CHECK-IN DATE
        </div>
        <div className="flex items-center justify-center text-white">
          CHECK-OUT DATE
        </div>
        <div className="flex items-center justify-center text-white">PRICE</div>
        <div className="flex items-center justify-center text-white">
          STATUS
        </div>
        <div className="flex items-center justify-center text-white">
          ACTIONS
        </div>
      </div>
      {bookingData.length > 0 ? (
        <>
          {bookingData.map((booking, i) =>
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
            ) : (
              <></>
            )
          )}
          <Pagination
            className="m-3 flex justify-center"
            isCompact
            showControls
            total={Math.ceil(pagination.total / pagination.per_page)}
            initialPage={1}
            page={page}
            onChange={(page) => {
              setPage(page);
            }}
          />
        </>
      ) : (
        <div className="flex w-full justify-center">
          <span className=" p-5 text-foreground-500">No bookings found</span>
        </div>
      )}
    </>
  );
};

export default BookingHistoryComponent;

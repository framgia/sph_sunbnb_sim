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
      <div className="mb-2 flex h-auto w-full flex-row">
        <BookingtFilterSection filters={filters} setFilters={setFilters} />
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="mx-2"
                radius="sm"
                variant="solid"
                color="primary"
                endContent={<ChevronDownIcon />}
              >
                {listings.length > 0 ? (
                  <p className="truncate">
                    {
                      listings.find(
                        (item) => item.id === Number(currentListing)
                      )?.name
                    }
                  </p>
                ) : (
                  "No Active Listing"
                )}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="listings"
              onAction={(key) => {
                setListing(key as number);
              }}
            >
              {listings.map((listing) => (
                <DropdownItem key={listing.id}>
                  <span className="line-clamp-1 w-full">{listing.name}</span>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="mb-2 flex flex-row items-center justify-between">
        <div>
          <span className="text-xs text-default-500">
            Total:{" "}
            {bookingData.length > 1
              ? bookingData.length + " " + "guests"
              : "1 guest"}
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
          <div className="flex items-center text-xs text-default-500">
            Rows per page: {pagination.per_page}
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
      <div className="grid h-[50px] grid-cols-[25%_18%_18%_9%_10%_10%_10%] rounded-lg bg-primary-600 px-2 text-sm">
        <div className="flex items-center justify-center px-5 text-white">
          NAME
        </div>
        <div className="flex items-center justify-center px-5 text-white">
          CHECK-IN DATE
        </div>
        <div className="flex items-center justify-center px-5 text-white">
          CHECK-OUT DATE
        </div>
        <div className="flex items-center justify-center px-5 text-white">
          GUESTS
        </div>
        <div className="flex items-center justify-center px-5 text-white">
          BILL
        </div>
        <div className="flex items-center justify-center px-5 text-white">
          STATUS
        </div>
        <div className="flex items-center justify-center px-5 text-white">
          ACTION
        </div>
      </div>
      {bookingData.length > 0 ? (
        <>
          {bookingData.map((book, i) => {
            return (
              <div
                className="my-5 grid h-[50px] grid-cols-[25%_18%_18%_9%_10%_10%_10%] px-2 text-sm"
                key={i}
              >
                <div className="flex items-center justify-center">
                  <div className="m-2 flex flex-row">
                    <Avatar
                      name={getInitials(
                        book.user.first_name + " " + book.user.last_name
                      )}
                    />
                    <div className="ml-2 flex flex-col">
                      <span className="text-md font-semibold">
                        {book.user.first_name + " " + book.user.last_name}
                      </span>
                      <span className="text-xs">{book.user.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  {new Date(book.start_date).toDateString()}
                </div>
                <div className="flex items-center justify-center">
                  {new Date(book.end_date).toDateString()}
                </div>
                <div className="flex items-center justify-center">
                  {book.number_of_guests}
                </div>
                <div className="flex items-center justify-center">
                  ₱ {book.total_price}
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex justify-center">
                    <StatusChip status={book.status} />
                  </div>
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
        </>
      ) : (
        <p className="m-10 flex justify-center text-neutral-400">
          No bookings to display.
        </p>
      )}
    </div>
  );
};

export default ListingBookingsTable;

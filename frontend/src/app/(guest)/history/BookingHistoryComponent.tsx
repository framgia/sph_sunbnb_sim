"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Spinner
} from "@nextui-org/react";
import SearchIcon from "../../components/svgs/SearchIcon";
import type { BookingHistory, PaginationType } from "../../interfaces/types";
import BookingHistoryData from "./BookingHistoryData";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ChevronDownIcon from "@/app/components/svgs/Calendar/ChevronDownIcon";

interface BookingHistoryProps {
  bookings: BookingHistory[];
  pagination: PaginationType;
}

const BookingHistoryComponent: React.FC<BookingHistoryProps> = ({
  bookings,
  pagination
}) => {
  const [bookingsState, setBookingsState] =
    useState<BookingHistory[]>(bookings);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(pagination.current_page);
  const [perPage, setPerPage] = useState(pagination.per_page);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const filteredBookings = bookingsState.filter((booking) =>
    booking.listing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    if (searchQuery === "") params.delete("query");
    else params.set("query", searchQuery.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchQuery, pathname, searchParams, router]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    if (page === 1) params.delete("page");
    else params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [page, pathname, searchParams, router]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    if (perPage === 5) params.delete("size");
    else params.set("size", perPage.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [perPage, pathname, searchParams, router]);

  useEffect(() => {
    setLoading(false);
    setBookingsState(bookings);
  }, [bookings, router]);

  return (
    <>
      <div className="mt-5 font-semibold">Your booking history</div>
      <div className="mb-6 mt-5 flex w-[340px] flex-wrap gap-4 md:mb-0 md:flex-nowrap">
        <Input
          variant="bordered"
          placeholder="Search by name..."
          startContent={
            <SearchIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
          }
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="mb-1 mt-10 flex justify-between">
        <div className="flex">
          <span className="flex self-center">
            Total bookings: {pagination.total}
          </span>
        </div>
        <div className="flex flex-row">
          <span className="flex self-center">
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
                setPerPage(Number(key));
              }}
            >
              <DropdownItem key={3}>3</DropdownItem>
              <DropdownItem key={5}>5</DropdownItem>
              <DropdownItem key={8}>8</DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
      {!isLoading ? (
        filteredBookings.length > 0 ? (
          filteredBookings.map((booking, i) => (
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
              bookings={bookingsState}
              setbookings={setBookingsState}
            />
          ))
        ) : (
          <div className="flex w-full justify-center">
            <span className=" p-5 text-foreground-500">No bookings found</span>
          </div>
        )
      ) : (
        <div className="flex justify-center p-10">
          <Spinner />
        </div>
      )}

      <Pagination
        className="flex justify-center"
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
  );
};

export default BookingHistoryComponent;

"use client";
import React, { useEffect, useState } from "react";
import { Input, Pagination, Spinner } from "@nextui-org/react";
import SearchIcon from "../../components/svgs/SearchIcon";
import { BookingHistory, PaginationType } from "../../interfaces/types";
import BookingHistoryData from "./BookingHistoryData";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBookings = bookingsState.filter((booking) =>
    booking.listing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    if (page === 1) params.delete("page");
    else params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [page, pathname, searchParams]);

  useEffect(() => {
    setLoading(false);
    setBookingsState(bookings);
  }, [bookings]);

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
        <div>Total bookings: {pagination.total} </div>
        <div>Rows per page: {pagination.per_page} </div>
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

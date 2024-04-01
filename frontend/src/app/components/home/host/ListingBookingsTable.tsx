"use client";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import StatusChip from "../../StatusChip";
import BookingActions from "./BookingActions";
import type {
  BookingType,
  HostBookingFilters,
  Listing
} from "@/app/interfaces/types";
import { getInitials } from "@/app/utils/helpers/getInitials";
import SearchIcon from "../../svgs/SearchIcon";
import ChevronDownIcon from "../../svgs/Calendar/ChevronDownIcon";
import { BookingStatus } from "@/app/utils/enums";
import { getListingBookings } from "@/app/utils/helpers/bookingmanagement/request";

const ListingBookingsTable: React.FC<{
  listings: Listing[];
}> = ({ listings }) => {
  const [filters, setFilters] = useState<HostBookingFilters>({
    status: "status",
    search: ""
  });
  const [currentListing, setListing] = useState(listings[0]?.id ?? 0);
  const [actionDone, setActionDone] = useState(false);
  const [bookingData, setBookingData] = useState<BookingType[]>([]);
  //  since pagination in backend is in backend, replace pagination implementation with useSWR on integration
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(bookingData.length / rowsPerPage);
  const slicedBookings = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return bookingData.slice(start, end);
  }, [page, bookingData]);
  const classNames = React.useMemo(
    () => ({
      th: ["bg-primary-600", "text-white"]
    }),
    []
  );

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const data = await getListingBookings(currentListing, filters);
      if (data !== undefined) setBookingData(data);
    }
    fetchData().catch((error) => {
      console.error("Failed to get bookings from listing: ", error);
    });
  }, [currentListing, filters, actionDone]);

  return (
    <div>
      <div className="mb-2 flex h-auto w-full flex-row">
        <Input
          size="sm"
          className="mr-5 w-1/4 "
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
                className="mx-2 w-40"
                radius="sm"
                variant="solid"
                color="primary"
                endContent={<ChevronDownIcon />}
              >
                {filters.status[0].toUpperCase() +
                  filters.status.slice(1).toLowerCase()}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="status"
              onAction={(key) => {
                setFilters({ ...filters, status: key as string });
              }}
            >
              <DropdownItem key={BookingStatus.DONE}>Done</DropdownItem>
              <DropdownItem key={BookingStatus.PENDING}>Pending</DropdownItem>
              <DropdownItem key={BookingStatus.REFUSED}>Refused</DropdownItem>
              <DropdownItem key={BookingStatus.UPCOMING}>Upcoming</DropdownItem>
              <DropdownItem key={BookingStatus.CANCELLED}>
                Cancelled
              </DropdownItem>
              <DropdownItem key={"status"}>All</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button
                className="mx-2 w-40"
                radius="sm"
                variant="solid"
                color="primary"
                endContent={<ChevronDownIcon />}
              >
                {listings.length > 0
                  ? listings.find((item) => item.id === Number(currentListing))
                      ?.name
                  : "No Active Listing"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="listings"
              onAction={(key) => {
                setListing(key as number);
              }}
            >
              {listings.map((listing) => (
                <DropdownItem key={listing.id}>{listing.name}</DropdownItem>
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
        <div>
          <div className="flex flex-row items-center text-xs text-default-500">
            Rows per page: 5
            <Button
              variant="light"
              className="text-xs text-default-500"
              isIconOnly
            >
              <ChevronDownIcon />
            </Button>
          </div>
        </div>
      </div>
      <Table
        aria-label="Table of bookings for a listing"
        classNames={classNames}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => {
                setPage(page);
              }}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>CHECK-IN DATE</TableColumn>
          <TableColumn>CHECK-OUT DATE</TableColumn>
          <TableColumn>GUESTS</TableColumn>
          <TableColumn>BILL</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {slicedBookings.map((book, i) => {
            return (
              <TableRow key={i}>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  {new Date(book.start_date).toDateString()}
                </TableCell>
                <TableCell>{new Date(book.end_date).toDateString()}</TableCell>
                <TableCell>{book.number_of_guests}</TableCell>
                <TableCell>₱ {book.total_price}</TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <StatusChip status={book.status} />
                  </div>
                </TableCell>
                <TableCell>
                  <BookingActions
                    status={book.status}
                    id={book.id}
                    setActionDone={setActionDone}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListingBookingsTable;

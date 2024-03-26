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
import React, { useState } from "react";
import StatusChip from "../../StatusChip";
import BookingActions from "./BookingActions";
import type { BookingType } from "@/app/interfaces/types";
import { getInitials } from "@/app/utils/helpers/getInitials";
import SearchIcon from "../../svgs/SearchIcon";
import ChevronDownIcon from "../../svgs/Calendar/ChevronDownIcon";
import { BookingStatus } from "@/app/utils/enums";

const ListingBookingsTable: React.FC<{ bookings: BookingType[] }> = ({
  bookings
}) => {
  const [statusFilter, setStatusF] = useState("status");
  const [currentListing, setListing] = useState("1");

  //  since pagination in backend is in backend, replace pagination implementation with useSWR on integration
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(bookings.length / rowsPerPage);
  const slicedBookings = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return bookings.slice(start, end);
  }, [page, bookings]);
  const classNames = React.useMemo(
    () => ({
      th: ["bg-primary-600", "text-white"]
    }),
    []
  );

  return (
    <div>
      <div className="mb-2 flex h-auto w-full flex-row">
        <Input
          size="sm"
          className="mr-5 w-1/4 "
          placeholder="Search by name..."
          variant="bordered"
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
                {statusFilter[0].toUpperCase() +
                  statusFilter.slice(1).toLowerCase()}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key) => {
                setStatusF(key as string);
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
                Listing {currentListing}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key) => {
                setListing(key as string);
              }}
            >
              <DropdownItem key={1}>Listing 1</DropdownItem>
              <DropdownItem key={2}>Listing 2</DropdownItem>
              <DropdownItem key={3}>Listing 3</DropdownItem>
              <DropdownItem key={4}>Listing 4</DropdownItem>
              <DropdownItem key={5}>Listing 5</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="mb-2 flex flex-row items-center justify-between">
        <div>
          <span className="text-xs text-default-500">
            Total:{" "}
            {bookings.length > 1 ? bookings.length + " " + "guests" : "1 guest"}
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
                  <BookingActions status={book.status} />
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

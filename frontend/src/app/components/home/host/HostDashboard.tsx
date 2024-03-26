import React from "react";
import ListingBookingsTable from "./ListingBookingsTable";
import type { BookingType, UserDetailsType } from "@/app/interfaces/types";
import { BookingStatus } from "@/app/utils/enums";
import PendingCardsSlicer from "./PendingCardsSlicer";
import { checkCookies } from "@/app/utils/helpers/userHelper";

const HostDashboard: React.FC<{ userName: string }> = ({ userName }) => {
  //  dummy data, replace with fetch in integration
  const PendingListings = [
    { id: 1, name: "My First Listing" },
    { id: 2, name: "Tiny Home" },
    { id: 3, name: "Firefly Fun House" },
    { id: 4, name: "My Farm" },
    { id: 5, name: "Nowhere" },
    { id: 6, name: "My Home" },
    { id: 7, name: "Mojave" }
  ];

  const Bookings: BookingType[] = [
    {
      id: 3,
      user_id: 2,
      listing_id: 1,
      start_date: "2024-04-05",
      end_date: "2024-04-07",
      number_of_guests: 5,
      total_price: 16001.14,
      status: BookingStatus.PENDING,
      host_deleted: 0,
      created_at: "2024-03-26T05:21:51.000000Z",
      updated_at: "2024-03-26T05:21:51.000000Z",
      deleted_at: null,
      user: {
        id: 2,
        first_name: "Aracs",
        last_name: "Encabo",
        email: "userguest@gmail.com"
      } as unknown as UserDetailsType
    },
    {
      id: 4,
      user_id: 3,
      listing_id: 1,
      start_date: "2024-04-10",
      end_date: "2024-04-11",
      number_of_guests: 2,
      total_price: 1920.2,
      status: BookingStatus.DONE,
      host_deleted: 0,
      created_at: "2024-03-26T05:21:51.000000Z",
      updated_at: "2024-03-26T05:21:51.000000Z",
      deleted_at: null,
      user: {
        id: 3,
        first_name: "John",
        last_name: "Smith",
        email: "johnSmith@gmail.com"
      } as unknown as UserDetailsType
    },
    {
      id: 5,
      user_id: 4,
      listing_id: 1,
      start_date: "2024-04-05",
      end_date: "2024-04-07",
      number_of_guests: 1,
      total_price: 7201.14,
      status: BookingStatus.UPCOMING,
      host_deleted: 0,
      created_at: "2024-03-26T05:21:51.000000Z",
      updated_at: "2024-03-26T05:21:51.000000Z",
      deleted_at: null,
      user: {
        id: 4,
        first_name: "Cody",
        last_name: "Rhodes",
        email: "crossrhodes@gmail.com"
      } as unknown as UserDetailsType
    },
    {
      id: 6,
      user_id: 5,
      listing_id: 1,
      start_date: "2024-04-05",
      end_date: "2024-04-07",
      number_of_guests: 2,
      total_price: 153.14,
      status: BookingStatus.REFUSED,
      host_deleted: 0,
      created_at: "2024-03-26T05:21:51.000000Z",
      updated_at: "2024-03-26T05:21:51.000000Z",
      deleted_at: null,
      user: {
        id: 5,
        first_name: "Rhea",
        last_name: "Ripley",
        email: "judgementday@gmail.com"
      } as unknown as UserDetailsType
    },
    {
      id: 7,
      user_id: 8,
      listing_id: 1,
      start_date: "2024-04-05",
      end_date: "2024-04-07",
      number_of_guests: 5,
      total_price: 16001.14,
      status: BookingStatus.PENDING,
      host_deleted: 0,
      created_at: "2024-03-26T05:21:51.000000Z",
      updated_at: "2024-03-26T05:21:51.000000Z",
      deleted_at: null,
      user: {
        id: 8,
        first_name: "Sami",
        last_name: "Zayn",
        email: "worldsapart@gmail.com"
      } as unknown as UserDetailsType
    },
    {
      id: 8,
      user_id: 12,
      listing_id: 1,
      start_date: "2024-04-05",
      end_date: "2024-04-07",
      number_of_guests: 4,
      total_price: 2001.14,
      status: BookingStatus.UPCOMING,
      host_deleted: 0,
      created_at: "2024-03-26T05:21:51.000000Z",
      updated_at: "2024-03-26T05:21:51.000000Z",
      deleted_at: null,
      user: {
        id: 12,
        first_name: "Jey",
        last_name: "Uso",
        email: "mainevent@gmail.com"
      } as unknown as UserDetailsType
    },
    {
      id: 9,
      user_id: 78,
      listing_id: 1,
      start_date: "2024-04-05",
      end_date: "2024-04-07",
      number_of_guests: 5,
      total_price: 16001.14,
      status: BookingStatus.DONE,
      host_deleted: 0,
      created_at: "2024-03-26T05:21:51.000000Z",
      updated_at: "2024-03-26T05:21:51.000000Z",
      deleted_at: null,
      user: {
        id: 78,
        first_name: "Steve",
        last_name: "Austin",
        email: "stonecold@gmail.com"
      } as unknown as UserDetailsType
    }
  ];

  //  End of Dummy Data

  return (
    <>
      <span className="text-lg font-semibold">Welcome back, {userName}!</span>
      <PendingCardsSlicer cards={PendingListings} />
      <div className="flex flex-col py-2">
        <div className="mb-5">
          <span className="text-xs font-semibold">Your reservations</span>
        </div>
        <ListingBookingsTable bookings={Bookings} />
      </div>
    </>
  );
};

export default HostDashboard;

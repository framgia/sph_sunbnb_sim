import ListingDoughnut from "@/app/components/admin/ListingDoughnut";
import BookingsIcon from "@/app/components/svgs/Admin/BookingsIcon";
import ListingsIcon from "@/app/components/svgs/Admin/ListingsIcon";
import UsersIcon from "@/app/components/svgs/Admin/UsersIcon";
import { formatCurrency } from "@/app/utils/currency";
import React from "react";

interface AnalyticsProps {
  usersCount: number;
  hostsCount: number;
  guestsCount: number;
  adminCount: number;
  bookingsCount: number;
  listingsCount: number;
  accumulatedVal: number;
  approvedListings: number;
}

const AdminAnalytics: React.FC<AnalyticsProps> = ({
  usersCount,
  hostsCount,
  guestsCount,
  adminCount,
  bookingsCount,
  listingsCount,
  accumulatedVal,
  approvedListings
}) => {
  return (
    <div>
      <div className="h-auto md:h-96">
        <div className="mt-3 flex flex-col md:h-1/2 md:w-full md:flex-row">
          <div className="mb-2 mr-2 flex w-full flex-col items-center bg-primary p-4 text-white md:mb-0 md:w-1/4 md:self-center">
            <div className="m-2">
              <UsersIcon />
            </div>
            <span className="text-2xl font-bold">{usersCount}</span>
            <span className="text-2xl">Users</span>
          </div>
          <div className="flex w-full flex-col text-white md:mx-2 md:w-1/4 ">
            <div className="mb-2 h-1/3 items-center justify-center bg-primary-500 p-2">
              <div className="flex h-full items-center justify-center px-10 md:justify-between">
                <span className="mr-5 text-2xl font-bold md:mr-2">
                  {guestsCount}
                </span>
                <span className="text-2xl">guests</span>
              </div>
            </div>
            <div className="mb-2 h-1/3 bg-primary-400 p-2 ">
              <div className="flex h-full items-center justify-center px-10 md:justify-between">
                <span className="mr-5 text-2xl font-bold md:mr-2">
                  {hostsCount}
                </span>
                <span className="text-2xl">hosts</span>
              </div>
            </div>
            <div className="h-1/3 bg-primary-300 p-2">
              <div className="flex h-full items-center justify-center px-10 md:justify-between">
                <span className="mr-5 text-2xl font-bold md:mr-2">
                  {adminCount}
                </span>
                <span className="text-2xl">admins</span>
              </div>
            </div>
          </div>
          <div className=" mt-2 flex w-full flex-row items-center justify-center bg-primary-700 p-5 text-white md:mx-2 md:mt-0 md:w-1/4">
            <div className="px-2">
              <BookingsIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{bookingsCount}</span>
              <span className="text-2xl">Bookings</span>
            </div>
          </div>
          <div className="mt-2 flex w-full flex-row items-center justify-center bg-primary-800 p-5 pr-9 text-white md:ml-2 md:mt-0 md:w-1/4 md:pr-5">
            <div className="px-2">
              <ListingsIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{listingsCount}</span>
              <span className="text-2xl">Listings</span>
            </div>
          </div>
        </div>
        <div className="my-2 w-full flex-row md:my-5 md:flex md:h-1/2">
          <div className="mr-2 w-full bg-primary-800 p-5 text-white md:w-1/2">
            <div className="mt-0 flex flex-col p-5 md:mt-5 md:p-0">
              <span className="text-xl font-bold">Accumulated value</span>
              <div className="mt-5 flex w-full items-center justify-center self-center text-2xl">
                <span className="text-4xl">
                  ₱
                  <span className="font-bold">
                    {` ${formatCurrency("PHP", 2, accumulatedVal).substring(1)}`}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="ml-0 mt-2 flex w-full items-center bg-primary p-5 text-white md:ml-2 md:mt-0 md:w-1/2 md:p-10 md:p-5 ">
            <div className="flex w-full flex-row justify-center md:w-auto md:justify-between">
              <div className="flex w-1/2 flex-col">
                <span className="text-xl font-bold">Approved Listings</span>
                <div className="mt-5 flex w-full items-center justify-center self-center">
                  <span className="text-2xl">
                    <span className="font-bold">{approvedListings} </span>
                    Approved Listings
                  </span>
                </div>
              </div>
              <div className="z-20 flex w-32 items-center justify-center px-2 md:w-40 md:px-5">
                <ListingDoughnut
                  approved={approvedListings}
                  unapproved={listingsCount - approvedListings}
                />
              </div>
            </div>
            <div className="mx-[-100px] text-end text-2xl font-bold md:mx-[-105px] md:block">
              {Math.ceil((approvedListings / listingsCount) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

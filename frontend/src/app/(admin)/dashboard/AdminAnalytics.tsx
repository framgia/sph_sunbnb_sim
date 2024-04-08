import BookingsIcon from "@/app/components/svgs/Admin/BookingsIcon";
import ListingsIcon from "@/app/components/svgs/Admin/ListingsIcon";
import UsersIcon from "@/app/components/svgs/Admin/UsersIcon";
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
      <div className="h-96">
        <div className="my-5 flex h-1/2 w-full flex-row">
          <div className="mr-2 flex w-1/4 flex-col items-center self-center bg-primary p-4 text-white">
            <div className="m-2">
              <UsersIcon />
            </div>
            <span className="text-2xl font-bold">{usersCount}</span>
            <span className="text-2xl">Users</span>
          </div>
          <div className="mx-2 flex w-1/4 flex-col text-white">
            <div className="mb-2 h-1/3 items-center justify-center bg-primary-500 p-2">
              <div className="flex h-full items-center justify-between px-10">
                <span className="mr-2 text-2xl font-bold">{guestsCount}</span>
                <span className="text-2xl">guests</span>
              </div>
            </div>
            <div className="mb-2 h-1/3 bg-primary-400 p-2 ">
              <div className="flex h-full items-center justify-between px-10">
                <span className="mr-2 text-2xl font-bold">{hostsCount}</span>
                <span className="text-2xl">hosts</span>
              </div>
            </div>
            <div className="h-1/3 bg-primary-300 p-2">
              <div className="flex h-full items-center justify-between px-10">
                <span className="mr-2 text-2xl font-bold">{adminCount}</span>
                <span className="text-2xl">admins</span>
              </div>
            </div>
          </div>
          <div className="mx-2 flex w-1/4 flex-row items-center justify-center bg-primary-700 p-5 text-white">
            <div className="px-2">
              <BookingsIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{bookingsCount}</span>
              <span className="text-2xl">Bookings</span>
            </div>
          </div>
          <div className="ml-2 flex w-1/4 flex-row items-center justify-center bg-primary-800 p-5 text-white">
            <div className="px-2">
              <ListingsIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{listingsCount}</span>
              <span className="text-2xl">Listings</span>
            </div>
          </div>
        </div>
        <div className="my-5 flex h-1/2 w-full flex-row">
          <div className="mr-2 w-1/2 bg-primary-800 p-5 text-white">
            <div className="flex flex-col">
              <span className="text-xl font-bold">Accumulated value</span>
              <div className="mt-5 flex w-full items-center justify-center self-center text-2xl">
                <span className="text-4xl">
                  ₱<span className="font-bold"> {accumulatedVal}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="ml-2 w-1/2 bg-primary p-5 text-white">
            <div className="flex flex-row">
              <div className="flex w-3/5 flex-col">
                <span className="text-xl font-bold">Approved Listings</span>
                <div className="mt-5 flex w-full items-center justify-center self-center px-2">
                  <span className="text-2xl">
                    <span className="font-bold">{approvedListings} </span>
                    Approved Listings
                  </span>
                </div>
              </div>
              {/* replace with percentage graph */}
              <div className="mt-10 h-full w-2/5 items-center px-2 text-5xl font-bold">
                <span>
                  {Math.ceil((approvedListings / listingsCount) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

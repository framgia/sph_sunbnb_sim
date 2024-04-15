"use server";
import React from "react";
import ListingBookingsTable from "./ListingBookingsTable";
import PendingCardsSlicer from "./PendingCardsSlicer";
import {
  getActiveListings,
  getPendingListings
} from "@/app/utils/helpers/bookingmanagement/request";

const HostDashboard: React.FC<{ userName: string }> = async ({ userName }) => {
  const pendingListings = await getPendingListings();
  const activeListings = await getActiveListings();

  return (
    <>
      <span className="text-lg font-semibold">Welcome back, {userName}!</span>
      <PendingCardsSlicer cards={pendingListings} />
      <div className="flex flex-col">
        <div className="mb-5">
          <span className="text-sm font-semibold">Your reservations</span>
        </div>
        <ListingBookingsTable listings={activeListings} />
      </div>
    </>
  );
};

export default HostDashboard;

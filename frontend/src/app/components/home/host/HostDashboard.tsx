import React from "react";
import PendingListingCard from "./PendingListingCard";

const HostDashboard: React.FC = () => {
  return (
    <>
      <span className="text-lg font-semibold">Welcome back, User!</span>
      <div className="flex flex-col py-2">
        <div className="flex w-full flex-row justify-between">
          <div>
            <span className="text-xs font-semibold">Waiting for approval</span>
          </div>
          <div>
            <span className="cursor-pointer text-xs font-semibold underline">
              Show all (num)
            </span>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4 py-5">
          <PendingListingCard />
          <PendingListingCard />
          <PendingListingCard />
          <PendingListingCard />
          <PendingListingCard />
        </div>
      </div>
    </>
  );
};

export default HostDashboard;

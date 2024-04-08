import React from "react";
import AdminAnalytics from "./AdminAnalytics";

const DashboardPage: React.FC = () => {
  return (
    <>
      <div>
        <span className="text-xl font-bold">Analytics</span>
      </div>
      <AdminAnalytics
        usersCount={420}
        hostsCount={50}
        guestsCount={350}
        adminCount={20}
        bookingsCount={1092}
        listingsCount={207}
        accumulatedVal={78920}
        approvedListings={198}
      />
      <div className="mt-10">
        <span className="text-xl font-bold">Popular Listings</span>
        <div className="my-5 flex h-56 w-full flex-row">
          <div className="mr-2 flex w-1/3 bg-primary"></div>
          <div className="mr-2 flex w-1/3 bg-primary"></div>
          <div className="flex w-1/3 bg-primary"></div>
        </div>
      </div>
      <div>
        <span className="text-xl font-bold">User Traffic</span>
        <div className="my-5 h-96 bg-primary text-white">Graph here</div>
      </div>
    </>
  );
};

export default DashboardPage;

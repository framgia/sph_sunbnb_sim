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
      </div>
      <div>
        <span className="text-xl font-bold">User Traffic</span>
      </div>
    </>
  );
};

export default DashboardPage;

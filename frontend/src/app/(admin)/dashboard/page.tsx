import React from "react";
import AdminAnalytics from "./AdminAnalytics";
import PopularListings from "@/app/components/admin/PopularListingsSection";
import UserTrafficSection from "@/app/components/admin/UserTrafficSection";

const DashboardPage: React.FC = async () => {
  // const analytics = await getAdminAnalytics();

  return (
    <>
      <div>
        <span className="text-xl font-bold">Analytics</span>
      </div>
      <AdminAnalytics
        usersCount={13}
        hostsCount={3}
        guestsCount={5}
        adminCount={5}
        bookingsCount={7}
        listingsCount={22}
        accumulatedVal={7,420}
        approvedListings={20}
      />
      <div className="mt-12">
        <span className="text-xl font-bold">Popular Listings</span>
        <PopularListings listings={[]} />
      </div>
      <div className="mt-8">
        <span className="text-xl font-bold">User Traffic</span>
        <div className="mt-3 h-96">
          <UserTrafficSection month={""} users={[]} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

import React from "react";
import AdminAnalytics from "./AdminAnalytics";
import PopularListings from "@/app/components/admin/PopularListingsSection";
import UserTrafficSection from "@/app/components/admin/UserTrafficSection";
import { getAdminAnalytics } from "@/app/utils/helpers/adminHelper";

const DashboardPage: React.FC = async () => {
  const analytics = await getAdminAnalytics();

  return (
    <>
      <div>
        <span className="text-xl font-bold">Analytics</span>
      </div>
      <AdminAnalytics
        usersCount={
          (analytics?.users.host ?? 0) +
          (analytics?.users.guest ?? 0) +
          (analytics?.users.admin ?? 0)
        }
        hostsCount={analytics?.users.host ?? 0}
        guestsCount={analytics?.users.guest ?? 0}
        adminCount={analytics?.users.admin ?? 0}
        bookingsCount={
          (analytics?.bookings.pending ?? 0) +
          (analytics?.bookings.upcoming ?? 0) +
          (analytics?.bookings.done ?? 0) +
          (analytics?.bookings.cancelled ?? 0) +
          (analytics?.bookings.refused ?? 0)
        }
        listingsCount={
          (analytics?.listings.pending ?? 0) +
          (analytics?.listings.active ?? 0) +
          (analytics?.listings.refused ?? 0)
        }
        accumulatedVal={analytics?.bookings.value ?? 0}
        approvedListings={analytics?.listings.active ?? 0}
      />
      <div className="mt-12">
        <span className="text-xl font-bold">Popular Listings</span>
        <PopularListings listings={analytics?.listings.popular ?? []} />
      </div>
      <div className="mt-8">
        <span className="text-xl font-bold">User Traffic</span>
        <div className="mt-3 h-96">
          <UserTrafficSection
            month={analytics?.users.traffic.month ?? ""}
            users={analytics?.users.traffic.users ?? []}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

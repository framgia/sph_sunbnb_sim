import React from "react";
import AdminAnalytics from "./AdminAnalytics";
import { Accommodation, Listing } from "@/app/interfaces/types";
import { ListingStatus, UserRole } from "@/app/utils/enums";
import PopularListingCard from "@/app/components/admin/PopularListingCard";
import PopularListings from "@/app/components/admin/PopularListingsSection";

const DashboardPage: React.FC = () => {
  const dummyListing: Listing = {
    id: 13,
    user_id: 1,
    status: ListingStatus.PENDING,
    name: "Farmmmm",
    description: "Description of the listing",
    province: "Example Province",
    city: "Example City",
    barangay: "Example Barangay",
    street: "Example Street",
    zip_code: 12345,
    price: 100.0,
    maximum_guests: 5,
    listable_type: "App\\Models\\Accommodation",
    listable_id: 15,
    created_at: new Date("2024-03-08T08:48:24.000000Z"),
    updated_at: new Date("2024-03-08T08:48:24.000000Z"),
    deleted_at: null,
    media: [
      {
        id: 31,
        listing_id: 13,
        media:
          '["https://utfs.io/f/708298d7-aad9-491e-85c3-82f9cd0a79e3-g47goy.jpg"]',
        created_at: "2024-03-08T08:48:24.000000Z",
        updated_at: "2024-03-08T08:48:24.000000Z",
        deleted_at: null
      },
      {
        id: 32,
        listing_id: 13,
        media:
          '["https://utfs.io/f/ca88b394-c700-4cae-8176-6fe8d8b838b1-5nw4vb.png"]',
        created_at: "2024-03-08T08:48:24.000000Z",
        updated_at: "2024-03-08T08:48:24.000000Z",
        deleted_at: null
      },
      {
        id: 33,
        listing_id: 13,
        media:
          '["https://utfs.io/f/f5532a6f-e721-4458-9ffe-2ced484b7188-2487m.jpg"]',
        created_at: "2024-03-08T08:48:24.000000Z",
        updated_at: "2024-03-08T08:48:24.000000Z",
        deleted_at: null
      }
    ],
    user: {
      id: 1,
      first_name: "Aracs",
      last_name: "Encabo",
      email: "janedoe@example.com",
      created_at: "2024-03-08T07:08:20.000000Z",
      role: UserRole.HOST,
      status: "active",
      updated_at: ""
    }
  };
  const popularListings = [dummyListing, dummyListing, dummyListing];
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
        <PopularListings listings={popularListings} />
      </div>
      <div>
        <span className="text-xl font-bold">User Traffic</span>
        <div className="my-5 h-96 bg-primary text-white">Graph here</div>
      </div>
    </>
  );
};

export default DashboardPage;

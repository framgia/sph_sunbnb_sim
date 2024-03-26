import ExperienceBookingConfirm from "@/app/components/booking/ExperienceBookingConfirm";
import type {
  Listing_Experience,
  UserDetailsType
} from "@/app/interfaces/types";
import type { Inclusion, ListingStatus } from "@/app/utils/enums";

import React from "react";

const ExperienceCheckoutPage: React.FC = () => {
  const expData: Listing_Experience = {
    id: 4,
    user_id: 1,
    status: "Active" as ListingStatus,
    name: "Sports Tour 2",
    description: "A very cool tour.",
    province: "Cebu",
    city: "Cebu City",
    barangay: "Basak San Nicolas",
    street: "Bontores Street",
    zip_code: 6000,
    price: 3000.0,
    maximum_guests: 5,
    listable_type: "App\\Models\\Experience",
    listable_id: 3,
    created_at: new Date("2024-03-20T03:39:10.000000Z"),
    updated_at: new Date("2024-03-20T03:39:10.000000Z"),
    deleted_at: null,
    listable: {
      id: 3,
      type: "Sports",
      start_time: "09:00",
      end_time: "17:00",
      language: ["English", "Japanese"],
      inclusions: ["Food", "Drinks", "Tickets"] as Inclusion[],
      created_at: "2024-03-20T03:39:10.000000Z",
      updated_at: "2024-03-20T03:39:10.000000Z",
      deleted_at: null
    },
    media: [
      {
        id: 22,
        listing_id: 4,
        media:
          "https://utfs.io/f/708298d7-aad9-491e-85c3-82f9cd0a79e3-g47goy.jpg",
        created_at: "2024-03-20T03:39:10.000000Z",
        updated_at: "2024-03-20T03:39:10.000000Z",
        deleted_at: null
      },
      {
        id: 23,
        listing_id: 4,
        media:
          "https://utfs.io/f/ca88b394-c700-4cae-8176-6fe8d8b838b1-5nw4vb.png",
        created_at: "2024-03-20T03:39:10.000000Z",
        updated_at: "2024-03-20T03:39:10.000000Z",
        deleted_at: null
      },
      {
        id: 24,
        listing_id: 4,
        media:
          "https://utfs.io/f/f5532a6f-e721-4458-9ffe-2ced484b7188-2487m.jpg",
        created_at: "2024-03-20T03:39:10.000000Z",
        updated_at: "2024-03-20T03:39:10.000000Z",
        deleted_at: null
      }
    ],
    user: {
      id: 1,
      first_name: "Cara No Provider",
      last_name: "Encabo",
      email: "user2@example.com",
      created_at: "2024-03-20T03:19:29.000000Z"
    } as unknown as UserDetailsType
  };
  return (
    <div>
      {/* To_do: Add datesExcluded prop (type Date[]) for the dates not available for the experience so that we
      can validate if the date in checkout page is a blocked date or not and users cannot book block dates by
      entering date through url */}
      <ExperienceBookingConfirm listing={expData} />
    </div>
  );
};

export default ExperienceCheckoutPage;

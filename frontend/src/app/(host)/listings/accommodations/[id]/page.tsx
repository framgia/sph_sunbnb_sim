import AmenitySection from "@/app/components/accommodation/AmenitySection";
import ListingHeader from "@/app/components/accommodation/ListingHeader";
import { Divider } from "@nextui-org/react";
import React from "react";

const AccommodationDetailsPage: React.FC = () => {
  /* based on backend data format */
  const accDummyData = {
    id: 12,
    user_id: 1,
    status: "Pending",
    name: "Farm",
    description: "Description of the listing",
    province: "Example Province",
    city: "Example City",
    barangay: "Example Barangay",
    street: "Example Street",
    zip_code: 12345,
    price: "100.00",
    maximum_guests: 5,
    listable_type: "App\\Models\\Accommodation",
    listable_id: 14,
    created_at: "2024-03-08T08:16:25.000000Z",
    updated_at: "2024-03-08T08:16:25.000000Z",
    deleted_at: null,
    listable: {
      id: 14,
      type: "Farm",
      bed_count: 3,
      bedroom_count: 2,
      bathroom_count: 2,
      minimum_days: 1,
      maximum_days: 5,
      amenities: ["Kitchen", "Parking", "Gym"],
      created_at: "2024-03-08T08:16:25.000000Z",
      updated_at: "2024-03-08T08:16:25.000000Z",
      deleted_at: null
    },
    media: [
      {
        id: 28,
        listing_id: 12,
        media: "/images/ListingPic1.webp",
        created_at: "2024-03-08T08:16:25.000000Z",
        updated_at: "2024-03-08T08:16:25.000000Z",
        deleted_at: null
      },
      {
        id: 29,
        listing_id: 12,
        media: "/images/ListingPic2.webp",
        created_at: "2024-03-08T08:16:25.000000Z",
        updated_at: "2024-03-08T08:16:25.000000Z",
        deleted_at: null
      },
      {
        id: 30,
        listing_id: 12,
        media: "/images/ListingPic3.webp",
        created_at: "2024-03-08T08:16:25.000000Z",
        updated_at: "2024-03-08T08:16:25.000000Z",
        deleted_at: null
      },
      {
        id: 31,
        listing_id: 12,
        media: "/images/ListingPic4.webp",
        created_at: "2024-03-08T08:16:25.000000Z",
        updated_at: "2024-03-08T08:16:25.000000Z",
        deleted_at: null
      },
      {
        id: 32,
        listing_id: 12,
        media: "/images/ListingPic5.webp",
        created_at: "2024-03-08T08:16:25.000000Z",
        updated_at: "2024-03-08T08:16:25.000000Z",
        deleted_at: null
      }
    ],
    user: {
      id: 1,
      first_name: "Aracs",
      last_name: "Encabo",
      email: "janedoe@example.com",
      created_at: "2024-03-08T07:08:20.000000Z"
    }
  };

  return (
    <>
      <ListingHeader
        accomodationName={accDummyData.name}
        type={accDummyData.listable.type}
        city={accDummyData.city}
        guests={accDummyData.maximum_guests}
        bedrooms={accDummyData.listable.bedroom_count}
        beds={accDummyData.listable.bed_count}
        bathrooms={accDummyData.listable.bathroom_count}
        minimumNights={accDummyData.listable.minimum_days}
        maximumNights={accDummyData.listable.maximum_days}
        hostName={
          accDummyData.user.first_name + " " + accDummyData.user.last_name
        }
        createdAt={new Date(accDummyData.created_at)
          .toDateString()
          .split(" ")
          .slice(1)
          .join(" ")}
        modifiedAt={new Date(accDummyData.updated_at)
          .toDateString()
          .split(" ")
          .slice(1)
          .join(" ")}
        address={
          accDummyData.street +
          ", " +
          accDummyData.barangay +
          ", " +
          accDummyData.city +
          ", " +
          accDummyData.zip_code
        }
        images={accDummyData.media}
      />
      <Divider className="my-10 w-full" />
      <span className="text-sm">{accDummyData.description}</span>
      <Divider className="my-10 w-full " />
      <AmenitySection amenities={accDummyData.listable.amenities} />
      <Divider className="my-10 w-full " />
      {/* Separate Ratings and Reviews to a different component in the future */}
      <span className="text-xl font-semibold"> Ratings and Reviews (0) </span>
      <div className="flex h-40 w-full items-center justify-center">
        <span className="text-zinc-500">No reviews yet.</span>
      </div>
    </>
  );
};

export default AccommodationDetailsPage;

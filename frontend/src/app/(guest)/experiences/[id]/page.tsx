import ExperienceBookingSticky from "@/app/components/booking/ExperienceBookingSticky";
import ExperienceHeader from "@/app/components/experience/ExperienceHeader";
import InclusionSection from "@/app/components/experience/InclusionSection";
import ReviewSection from "@/app/components/review/ReviewSection";
import { Listing_Experience, UserDetailsType } from "@/app/interfaces/types";
import { Inclusion, ListingStatus } from "@/app/utils/enums";
import { Divider } from "@nextui-org/react";
import React from "react";

interface GuestExperienceDetailsProps {
  params: { id: number };
}
const GuestExperienceDetailsPage: React.FC<GuestExperienceDetailsProps> = ({
  params
}) => {
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
    <>
      <ExperienceHeader
        experienceName={expData.name}
        images={expData.media}
        street={expData.street}
        barangay={expData.barangay}
        city={expData.city}
        type={expData.listable.type}
        zipCode={expData.zip_code}
        languages={expData.listable.language}
        startTime={expData.listable.start_time}
        endTime={expData.listable.end_time}
        hostName={expData.user.first_name + " " + expData.user.last_name}
        createdAt={new Date(expData.created_at)
          .toDateString()
          .split(" ")
          .slice(1)
          .join(" ")}
        modifiedAt={new Date(expData.updated_at)
          .toDateString()
          .split(" ")
          .slice(1)
          .join(" ")}
        isHost={false}
        id={params.id}
      />
      <div className="flex h-fit flex-row items-start">
        <div className="w-full">
          <Divider className="my-10 w-full" />
          <span className="text-sm">
            <div className="flex flex-col">
              <span className="mb-5 text-xl font-semibold">
                What you&apos;ll do
              </span>
              <span>{expData.description}</span>
            </div>
          </span>
          <Divider className="my-10 w-full " />
          <InclusionSection inclusions={expData.listable.inclusions} />
          <Divider className="my-10 w-full " />
          <ReviewSection listingId={params.id} />
        </div>
        <div className="w-90 h-90 sticky top-[30px]  ml-5 block self-start pt-10">
          <ExperienceBookingSticky
            maxGuest={expData.maximum_guests}
            price={expData.price}
            startTime={expData.listable.start_time}
            endTime={expData.listable.end_time}
          />
        </div>
      </div>
    </>
  );
};

export default GuestExperienceDetailsPage;

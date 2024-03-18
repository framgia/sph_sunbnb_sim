import AmenitySection from "@/app/components/accommodation/AmenitySection";
import ListingHeader from "@/app/components/accommodation/ListingHeader";
import { getAccommodation } from "@/app/utils/helpers/accommodation/request";
import { Divider } from "@nextui-org/react";
import React from "react";

interface ListingDetailsPageProps {
  params: {
    id: string;
  };
}

const AccommodationDetailsPage: React.FC<ListingDetailsPageProps> = async ({
  params
}) => {
  /* based on backend data format */
  const accData = await getAccommodation(Number(params.id));

  return (
    <>
      {accData !== undefined ? (
        <>
          <ListingHeader
            accomodationName={accData.name}
            type={accData.listable.type}
            city={accData.city}
            guests={accData.maximum_guests}
            bedrooms={accData.listable.bedroom_count}
            beds={accData.listable.bed_count}
            bathrooms={accData.listable.bathroom_count}
            minimumNights={accData.listable.minimum_days}
            maximumNights={accData.listable.maximum_days}
            hostName={accData.user.first_name + " " + accData.user.last_name}
            createdAt={new Date(accData.created_at)
              .toDateString()
              .split(" ")
              .slice(1)
              .join(" ")}
            modifiedAt={new Date(accData.updated_at)
              .toDateString()
              .split(" ")
              .slice(1)
              .join(" ")}
            address={
              accData.street +
              ", " +
              accData.barangay +
              ", " +
              accData.city +
              ", " +
              accData.zip_code
            }
            images={accData.media}
          />
          <Divider className="my-10 w-full" />
          <span className="text-sm">{accData.description}</span>
          <Divider className="my-10 w-full " />
          <AmenitySection amenities={accData.listable.amenities} />
          <Divider className="my-10 w-full " />
          {/* Separate Ratings and Reviews to a different component in the future */}
          <span className="text-xl font-semibold">
            {" "}
            Ratings and Reviews (0){" "}
          </span>
          <div className="flex h-40 w-full items-center justify-center">
            <span className="text-zinc-500">No reviews yet.</span>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AccommodationDetailsPage;

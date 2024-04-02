import AmenitySection from "@/app/components/accommodation/AmenitySection";
import ListingHeader from "@/app/components/accommodation/ListingHeader";
import ReviewSection from "@/app/components/review/ReviewSection";
import { getAccommodation } from "@/app/utils/helpers/accommodation/request";
import { getListingType } from "@/app/utils/helpers/getListingType";
import { checkCookies } from "@/app/utils/helpers/userHelper";
import { Divider } from "@nextui-org/react";
import { redirect } from "next/navigation";
import React from "react";

interface ListingDetailsPageProps {
  params: {
    id: string;
  };
}

const AccommodationDetailsPage: React.FC<ListingDetailsPageProps> = async ({
  params
}) => {
  const user = await checkCookies();
  let accData;
  try {
    accData = await getAccommodation(Number(params.id));
  } catch (err) {
    redirect("/not-found");
  }

  if (
    getListingType(accData.listable_type) === "experience" ||
    getListingType(accData.listable_type) === undefined ||
    user?.id !== accData.user.id
  ) {
    redirect("/not-found");
  }

  return (
    <>
      {accData !== undefined ? (
        <>
          <ListingHeader
            id={Number(params.id)}
            accomodationName={accData.name}
            type={accData.listable.type}
            city={accData.city}
            price={accData.price}
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
            status={accData.status}
          />
          <div>
            <Divider className="my-10 " />
            <span className="text-sm">{accData.description}</span>
            <Divider className="my-10 " />
            <AmenitySection amenities={accData.listable.amenities} />
            <Divider className="my-10 " />
            <ReviewSection
              listingId={Number(params.id)}
              listingType="accommodation"
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AccommodationDetailsPage;

import AmenitySection from "@/app/components/accommodation/AmenitySection";
import ListingHeader from "@/app/components/accommodation/ListingHeader";
import AccommodationBookingSticky from "@/app/components/booking/AccommodationBookingSticky";
import ReviewSection from "@/app/components/review/ReviewSection";
import { getAccommodation } from "@/app/utils/helpers/accommodation/request";
import { Divider } from "@nextui-org/react";
import { redirect } from "next/navigation";
import React from "react";

interface GuestAccommodationDetailseProps {
  params: {
    id: string;
  };
}

const GuestAccommodationsDetails: React.FC<
  GuestAccommodationDetailseProps
> = async ({ params }) => {
  let accData;
  try {
    accData = await getAccommodation(Number(params.id));
  } catch (err) {
    redirect("/not-found");
  }

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
            isHost={false}
            id={params.id}
          />
          <div className="flex h-fit flex-row items-start">
            <div>
              <Divider className="my-10 " />
              <span className="text-sm">{accData.description}</span>
              <Divider className="my-10 " />
              <AmenitySection amenities={accData.listable.amenities} />
              <Divider className="my-10 " />
              <ReviewSection />
            </div>
            <div className="w-90 h-90 sticky top-[30px] z-50 ml-5 block self-start pt-10">
              <AccommodationBookingSticky
                price={accData.price}
                maxGuests={accData.maximum_guests}
                minNights={accData.listable.minimum_days}
                maxNights={accData.listable.maximum_days}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default GuestAccommodationsDetails;

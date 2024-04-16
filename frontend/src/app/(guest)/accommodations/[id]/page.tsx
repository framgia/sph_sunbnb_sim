import AmenitySection from "@/app/components/accommodation/AmenitySection";
import ListingHeader from "@/app/components/accommodation/ListingHeader";
import AccommodationBookingSticky from "@/app/components/booking/AccommodationBookingSticky";
import DefaultSticky from "@/app/components/booking/DefaultSticky";
import ReviewSection from "@/app/components/review/ReviewSection";
import type { CalendarDate } from "@/app/interfaces/types";
import { ListingStatus } from "@/app/utils/enums";
import { getPublicAccommodation } from "@/app/utils/helpers/accommodation/request";
import { getListingAvailability } from "@/app/utils/helpers/availability/requests";
import { getListingType } from "@/app/utils/helpers/getListingType";
import { checkCookies } from "@/app/utils/helpers/userHelper";
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
  let accAvailability;
  const user = await checkCookies();
  try {
    accData = await getPublicAccommodation(Number(params.id));
    if (user !== undefined && user !== null) {
      accAvailability = await getListingAvailability(Number(params.id));
    }
  } catch (err) {
    redirect("/not-found");
  }

  if (
    getListingType(accData.listable_type) === "experience" ||
    getListingType(accData.listable_type) === undefined ||
    accData.status !== ListingStatus.ACTIVE
  ) {
    redirect("/not-found");
  }

  let blockedDates: Date[] = [];
  if (accAvailability !== undefined && accAvailability !== null) {
    const unavailableArr: CalendarDate[] = accAvailability.filter(
      (calDate, _i) => {
        return !calDate.available;
      }
    );
    blockedDates = unavailableArr.map((calDate, i) => {
      return new Date(calDate.date);
    });
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
            id={Number(params.id)}
            status={accData.status}
            price={accData.price}
          />
          <div className="flex flex-col items-start md:flex-row">
            <div className="w-full flex-1">
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
            <div className="mt-5 block w-full self-start md:sticky md:top-[30px] md:z-50 md:ms-5 md:mt-0 md:w-80 md:pt-10">
              {user !== undefined && user !== null ? (
                <AccommodationBookingSticky
                  exclude={blockedDates}
                  price={accData.price}
                  maxGuests={accData.maximum_guests}
                  minNights={accData.listable.minimum_days}
                  maxNights={accData.listable.maximum_days}
                  listingId={Number(params.id)}
                  userRole={user.role}
                  enabled={true}
                />
              ) : (
                <DefaultSticky ForAccommodation={true} />
              )}
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

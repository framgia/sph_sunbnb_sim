import AccommodationBookingConfirm from "@/app/components/booking/AccommodationBookingConfirm";
import { getAccommodation } from "@/app/utils/helpers/accommodation/request";
import { getListingAvailability } from "@/app/utils/helpers/availability/requests";
import { redirect } from "next/navigation";
import React from "react";

interface AccommodationBookingProps {
  params: {
    id: number;
  };
}
const AccommodationBookingPage: React.FC<AccommodationBookingProps> = async ({
  params
}) => {
  const accommodation = await getAccommodation(params.id);
  const accAvailability = (await getListingAvailability(params.id)) ?? [];

  let blockedDates: Date[] = [];
  if (accAvailability !== undefined && accAvailability !== null) {
    blockedDates = accAvailability.map((calDate, _i) => {
      return new Date(calDate.date);
    });
  }

  if (
    accommodation === null ||
    accommodation === undefined ||
    accommodation.listable_type.split("\\")[2] === "Experience"
  ) {
    redirect("/not-found");
  }
  return (
    <>
      {/* To_do: Add datesExcluded prop (type Date[]) for the dates not available for the accommodation so that we
      can validate if the date in checkout page is a blocked date or not and users cannot book block dates by
      entering date through url */}
      <AccommodationBookingConfirm
        listing={accommodation}
        exclude={blockedDates}
      />
    </>
  );
};

export default AccommodationBookingPage;

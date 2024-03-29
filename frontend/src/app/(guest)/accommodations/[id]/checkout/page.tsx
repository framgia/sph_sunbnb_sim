import AccommodationBookingConfirm from "@/app/components/booking/AccommodationBookingConfirm";
import { getAccommodation } from "@/app/utils/helpers/accommodation/request";
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
  if (accommodation === null || accommodation === undefined) {
    redirect("/not-found");
  }
  return (
    <>
      {/* To_do: Add datesExcluded prop (type Date[]) for the dates not available for the accommodation so that we
      can validate if the date in checkout page is a blocked date or not and users cannot book block dates by
      entering date through url */}
      <AccommodationBookingConfirm listing={accommodation} />
    </>
  );
};

export default AccommodationBookingPage;

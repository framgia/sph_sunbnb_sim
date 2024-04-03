import AccommodationBookingConfirm from "@/app/components/booking/AccommodationBookingConfirm";
import type { CalendarDate } from "@/app/interfaces/types";
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
    const unavailableArr: CalendarDate[] = accAvailability.filter(
      (calDate, _i) => {
        return !calDate.available;
      }
    );
    blockedDates = unavailableArr.map((calDate, _i) => {
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
    <AccommodationBookingConfirm
      listing={accommodation}
      exclude={blockedDates}
    />
  );
};

export default AccommodationBookingPage;

import ExperienceBookingConfirm from "@/app/components/booking/ExperienceBookingConfirm";
import type { CalendarDate } from "@/app/interfaces/types";
import { getListingAvailability } from "@/app/utils/helpers/availability/requests";
import { getExperience } from "@/app/utils/helpers/experience/request";
import { redirect } from "next/navigation";

import React from "react";

interface ExperienceCheckoutProps {
  params: { id: number };
}
const ExperienceCheckoutPage: React.FC<ExperienceCheckoutProps> = async ({
  params
}) => {
  const expData = await getExperience(params.id);
  const expAvailability: CalendarDate[] =
    (await getListingAvailability(params.id)) ?? [];

  let blockedDates: Date[] = [];
  if (expAvailability !== undefined && expAvailability !== null) {
    blockedDates = expAvailability.map((calDate, _i) => {
      return new Date(calDate.date);
    });
  }

  if (
    expData === undefined ||
    expData == null ||
    expData.listable_type.split("\\")[2] === "Accommodation"
  ) {
    redirect("/not-found");
  }
  return (
    <>
      {expData !== undefined && expData !== null ? (
        <ExperienceBookingConfirm listing={expData} excluded={blockedDates} />
      ) : (
        <></>
      )}
    </>
  );
};

export default ExperienceCheckoutPage;

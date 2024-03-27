import ExperienceBookingConfirm from "@/app/components/booking/ExperienceBookingConfirm";
import type {
  Listing_Experience,
  UserDetailsType
} from "@/app/interfaces/types";
import type { Inclusion, ListingStatus } from "@/app/utils/enums";
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
  if (
    expData === undefined ||
    expData == null ||
    expData.listable_type.split("\\")[2] === "Accommodation"
  ) {
    redirect("/not-found");
  }
  return (
    <div>
      {/* To_do: Add datesExcluded prop (type Date[]) for the dates not available for the experience so that we
      can validate if the date in checkout page is a blocked date or not and users cannot book block dates by
      entering date through url */}
      {expData !== undefined && expData !== null ? (
        <ExperienceBookingConfirm listing={expData} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ExperienceCheckoutPage;

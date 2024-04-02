"use server";
import ExperienceHeader from "@/app/components/experience/ExperienceHeader";
import InclusionSection from "@/app/components/experience/InclusionSection";
import ReviewSection from "@/app/components/review/ReviewSection";
import type { Listing_Experience } from "@/app/interfaces/types";

import { getExperience } from "@/app/utils/helpers/experience/request";
import { getListingType } from "@/app/utils/helpers/getListingType";
import { Divider } from "@nextui-org/react";
import { redirect } from "next/navigation";
import React from "react";

interface ExperienceDetailsProps {
  params: {
    id: number;
  };
}

const ExperienceDetailsPage: React.FC<ExperienceDetailsProps> = async ({
  params
}) => {
  const expData: Listing_Experience = await getExperience(params.id);

  if (
    expData === undefined ||
    getListingType(expData.listable_type) === "accommodation" ||
    getListingType(expData.listable_type) === undefined
  ) {
    redirect("/not-found");
  }
  return (
    <>
      <ExperienceHeader
        id={Number(params.id)}
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
        hostId={expData.user.id}
        status={expData.status}
      />
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
      <ReviewSection listingId={params.id} listingType="experience" />
    </>
  );
};

export default ExperienceDetailsPage;

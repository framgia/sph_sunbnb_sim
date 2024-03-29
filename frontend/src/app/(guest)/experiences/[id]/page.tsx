import DefaultSticky from "@/app/components/booking/DefaultSticky";
import ExperienceBookingSticky from "@/app/components/booking/ExperienceBookingSticky";
import ExperienceHeader from "@/app/components/experience/ExperienceHeader";
import InclusionSection from "@/app/components/experience/InclusionSection";
import { getExperience } from "@/app/utils/helpers/experience/request";
import ReviewSection from "@/app/components/review/ReviewSection";
import type { Listing_Experience } from "@/app/interfaces/types";
import { checkCookies } from "@/app/utils/helpers/userHelper";
import { Divider } from "@nextui-org/react";
import React from "react";

interface GuestExperienceDetailsProps {
  params: { id: number };
}
const GuestExperienceDetailsPage: React.FC<
  GuestExperienceDetailsProps
> = async ({ params }) => {
  const user = await checkCookies();
  const expData: Listing_Experience = await getExperience(params.id);
  return (
    <>
      <ExperienceHeader
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
        id={params.id}
        hostId={user?.id}
      />
      <div className="flex h-fit flex-row items-start">
        <div className="w-full">
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
        </div>
        <div className="w-90 h-90 sticky top-[30px]  ml-5 block self-start pt-10">
          {user !== undefined && user !== null ? (
            <ExperienceBookingSticky
              maxGuest={expData.maximum_guests}
              price={expData.price}
              startTime={expData.listable.start_time}
              endTime={expData.listable.end_time}
              listingId={Number(params.id)}
            />
          ) : (
            <DefaultSticky ForAccommodation={false} />
          )}
        </div>
      </div>
    </>
  );
};

export default GuestExperienceDetailsPage;

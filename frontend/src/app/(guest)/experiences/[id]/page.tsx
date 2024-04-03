import DefaultSticky from "@/app/components/booking/DefaultSticky";
import ExperienceBookingSticky from "@/app/components/booking/ExperienceBookingSticky";
import ExperienceHeader from "@/app/components/experience/ExperienceHeader";
import InclusionSection from "@/app/components/experience/InclusionSection";
import { getPublicExperience } from "@/app/utils/helpers/experience/request";
import ReviewSection from "@/app/components/review/ReviewSection";
import type { CalendarDate, ExperienceListing } from "@/app/interfaces/types";
import { checkCookies } from "@/app/utils/helpers/userHelper";
import { Divider } from "@nextui-org/react";
import React from "react";
import { redirect } from "next/navigation";
import { getListingAvailability } from "@/app/utils/helpers/availability/requests";
import { ListingStatus } from "@/app/utils/enums";
import { getListingType } from "@/app/utils/helpers/getListingType";

interface GuestExperienceDetailsProps {
  params: { id: number };
}
const GuestExperienceDetailsPage: React.FC<
  GuestExperienceDetailsProps
> = async ({ params }) => {
  const user = await checkCookies();
  const expData: ExperienceListing = await getPublicExperience(params.id);
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
    getListingType(expData.listable_type) === "accommodation" ||
    expData.status !== ListingStatus.ACTIVE
  ) {
    redirect("/not-found");
  }

  return (
    <>
      {expData !== undefined && expData !== null ? (
        <>
          <ExperienceHeader
            experienceName={expData.name}
            images={expData.media}
            street={expData.street}
            barangay={expData.barangay}
            city={expData.city}
            type={expData.listable.type}
            price={expData.price}
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
            status={expData.status}
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
                  exclude={[...blockedDates, new Date()]}
                />
              ) : (
                <DefaultSticky ForAccommodation={false} />
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

export default GuestExperienceDetailsPage;

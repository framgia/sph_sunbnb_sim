import AdminApprover from "@/app/components/admin/AdminApprover";
import DefaultSticky from "@/app/components/booking/DefaultSticky";
import ExperienceBookingSticky from "@/app/components/booking/ExperienceBookingSticky";
import ExperienceHeader from "@/app/components/experience/ExperienceHeader";
import InclusionSection from "@/app/components/experience/InclusionSection";
import ReviewSection from "@/app/components/review/ReviewSection";
import type { CalendarDate, ExperienceListing } from "@/app/interfaces/types";
import { UserRole } from "@/app/utils/enums";
import { getListingAvailability } from "@/app/utils/helpers/availability/requests";
import { getPublicExperience } from "@/app/utils/helpers/experience/request";
import { getListingType } from "@/app/utils/helpers/getListingType";
import { checkCookies } from "@/app/utils/helpers/userHelper";
import { Divider } from "@nextui-org/react";
import { redirect } from "next/navigation";
import React from "react";

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
    const unavailableArr: CalendarDate[] = expAvailability.filter(
      (calDate, _i) => {
        return !calDate.available;
      }
    );
    blockedDates = unavailableArr.map((calDate, _i) => {
      return new Date(calDate.date);
    });
  }
  if (
    expData === undefined ||
    getListingType(expData.listable_type) === "accommodation"
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
            status={expData.status}
          />
          <div className="mb-20 flex h-fit flex-col items-start md:mb-3 md:flex-row">
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
            <div className="md:w-90 md:h-90 top-[30px] block w-full  self-start pt-10 md:sticky md:ml-5">
              {user !== undefined && user !== null ? (
                <ExperienceBookingSticky
                  maxGuest={expData.maximum_guests}
                  price={expData.price}
                  startTime={expData.listable.start_time}
                  endTime={expData.listable.end_time}
                  listingId={Number(params.id)}
                  exclude={[...blockedDates, new Date()]}
                  userRole={UserRole.ADMIN}
                  enabled={false}
                />
              ) : (
                <DefaultSticky ForAccommodation={false} />
              )}
            </div>
          </div>
          <AdminApprover id={expData.id} status={expData.status} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default GuestExperienceDetailsPage;

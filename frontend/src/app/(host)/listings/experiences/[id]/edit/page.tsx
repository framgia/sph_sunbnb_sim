"use server";
import React from "react";
import { getExperience } from "@/app/utils/helpers/experience/request";
import EditExperienceComponent from "./EditExperienceComponent";

interface EditListingPageProps {
  params: {
    id: string;
  };
}

const EditListingPage: React.FC<EditListingPageProps> = async ({ params }) => {
  const listing = await getExperience(Number(params.id));

  return (
    <main className="min-w-1/2 flex min-h-screen flex-col items-center justify-between">
      <EditExperienceComponent listing={listing} />
    </main>
  );
};

export default EditListingPage;

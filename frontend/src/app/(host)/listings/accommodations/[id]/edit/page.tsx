"use server";
import React from "react";
import EditListingComponent from "./EditListingComponent";
import { getAccommodation } from "@/app/utils/helpers/accommodation/request";

interface EditListingPageProps {
  params: {
    id: string;
  };
}

const EditListingPage: React.FC<EditListingPageProps> = async ({ params }) => {
  const listing = await getAccommodation(Number(params.id));

  return (
    <main className="min-w-1/2 flex min-h-screen flex-col items-center justify-between">
      <EditListingComponent listing={listing} />
    </main>
  );
};

export default EditListingPage;

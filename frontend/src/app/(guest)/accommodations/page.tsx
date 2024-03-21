import GuestListingHeader from "@/app/components/listings/GuestListingHeader";
import GuestListings from "@/app/components/listings/GuestListings";
import React from "react";

const AccommodationsPage: React.FC = () => {
  return (
    <main className="flex flex-col">
      <GuestListingHeader type="accommodations" />
      <GuestListings />
    </main>
  );
};

export default AccommodationsPage;

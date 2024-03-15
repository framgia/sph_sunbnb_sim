import React from "react";
import HostListings from "@/app/components/listings/HostListings";
import ListingHeader from "@/app/components/listings/ListingHeader";

const ListingsPage: React.FC = async ({
  searchParams
}: {
  searchParams?: {
    page?: number;
    size?: number;
  };
}) => {
  return (
    <main className="flex flex-col">
      <ListingHeader type="accommodations" />
      <HostListings
        page={searchParams?.page ?? 1}
        size={searchParams?.size ?? 3}
        type="accommodations"
      />
    </main>
  );
};

export default ListingsPage;

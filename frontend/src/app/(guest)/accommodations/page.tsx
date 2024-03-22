import React from "react";
import GuestListingHeader from "@/app/components/listings/GuestListingHeader";
import GuestListings from "@/app/components/listings/GuestListings";
import {
  LISTINGS_DEFAULT_PAGE,
  LISTINGS_DEFAULT_SIZE
} from "@/app/interfaces/ListingsProps";
import { getPublicAccommodations } from "@/app/utils/helpers/accommodation/request";

const AccommodationsPage: React.FC = async ({
  searchParams
}: {
  searchParams?: {
    page?: number;
    size?: number;
    query?: string;
    type?: string;
    price?: string;
    rating?: string;
    date?: string;
  };
}) => {
  const paginatedAccommodations = await getPublicAccommodations(
    searchParams?.page ?? LISTINGS_DEFAULT_PAGE,
    searchParams?.size ?? LISTINGS_DEFAULT_SIZE,
    searchParams?.type,
    searchParams?.query,
    searchParams?.rating,
    searchParams?.price,
    searchParams?.date
  );

  return (
    <main className="flex flex-col">
      {paginatedAccommodations !== undefined && (
        <div>
          <GuestListingHeader type="accommodations" />
          <GuestListings
            listings={paginatedAccommodations.listings}
            pagination={paginatedAccommodations.pagination}
            type="accommodations"
          />
        </div>
      )}
    </main>
  );
};

export default AccommodationsPage;

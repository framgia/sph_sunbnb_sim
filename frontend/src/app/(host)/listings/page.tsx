import React from "react";
import HostListings from "@/app/components/listings/HostListings";
import ListingHeader from "@/app/components/listings/ListingHeader";
import {
  LISTINGS_DEFAULT_PAGE,
  LISTINGS_DEFAULT_SIZE
} from "@/app/interfaces/ListingsProps";
import { getAccommodationsByUser } from "@/app/utils/helpers/accommodation/request";

const ListingsPage: React.FC = async ({
  searchParams
}: {
  searchParams?: {
    apage?: number;
    asize?: number;
    epage?: number;
    esize?: number;
  };
}) => {
  const paginatedAccommodations = await getAccommodationsByUser(
    searchParams?.apage ?? LISTINGS_DEFAULT_PAGE,
    searchParams?.asize ?? LISTINGS_DEFAULT_SIZE
  );

  return (
    <main className="flex flex-col">
      {paginatedAccommodations !== undefined && (
        <div className="min-h-[600px]">
          <ListingHeader type="accommodations" />
          <HostListings
            listings={paginatedAccommodations.listings}
            pagination={paginatedAccommodations.pagination}
            page={searchParams?.apage ?? LISTINGS_DEFAULT_PAGE}
            size={searchParams?.asize ?? LISTINGS_DEFAULT_SIZE}
            type="accommodations"
          />
        </div>
      )}
      {/* TODO: Fetch experiences */}
      <div className="mt-16 min-h-[600px]">
        <ListingHeader type="experiences" />
        <HostListings
          listings={[]}
          pagination={null}
          page={searchParams?.epage ?? LISTINGS_DEFAULT_PAGE}
          size={searchParams?.esize ?? LISTINGS_DEFAULT_SIZE}
          type="experiences"
        />
      </div>
    </main>
  );
};

export default ListingsPage;

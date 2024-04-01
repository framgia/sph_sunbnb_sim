import React from "react";
import {
  LISTINGS_DEFAULT_PAGE,
  LISTINGS_DEFAULT_SIZE
} from "@/app/interfaces/ListingsProps";
import { getPublicAccommodations } from "@/app/utils/helpers/accommodation/request";
import { ListingType, UserRole } from "@/app/utils/enums";
import ListingHeader from "@/app/components/listings/ListingHeader";
import Listings from "@/app/components/listings/Listings";

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
      <ListingHeader user={UserRole.GUEST} type={ListingType.ACCOMMODATION} />
      <Listings
        user={UserRole.GUEST}
        type={ListingType.ACCOMMODATION}
        listings={paginatedAccommodations?.listings ?? []}
        pagination={paginatedAccommodations?.pagination ?? null}
      />
    </main>
  );
};

export default AccommodationsPage;

import React from "react";
import {
  LISTINGS_DEFAULT_PAGE,
  LISTINGS_DEFAULT_SIZE
} from "@/app/interfaces/ListingsProps";
import { getAccommodationsByUser } from "@/app/utils/helpers/accommodation/request";
import ListingHeader from "@/app/components/listings/ListingHeader";
import { ListingType, UserRole } from "@/app/utils/enums";
import Listings from "@/app/components/listings/Listings";
import { getExperiencesByUser } from "@/app/utils/helpers/experience/request";

const ListingsPage: React.FC = async ({
  searchParams
}: {
  searchParams?: {
    apage?: number;
    asize?: number;
    epage?: number;
    esize?: number;
    aquery?: string;
    atype?: string;
    aprice?: string;
    astatus?: string;
    equery?: string;
    etype?: string;
    eprice?: string;
    estatus?: string;
  };
}) => {
  const paginatedAccommodations = await getAccommodationsByUser(
    searchParams?.apage ?? LISTINGS_DEFAULT_PAGE,
    searchParams?.asize ?? LISTINGS_DEFAULT_SIZE,
    searchParams?.aquery,
    searchParams?.atype,
    searchParams?.aprice,
    searchParams?.astatus
  );
  const paginatedExperiences = await getExperiencesByUser(
    searchParams?.epage ?? LISTINGS_DEFAULT_PAGE,
    searchParams?.esize ?? LISTINGS_DEFAULT_SIZE,
    searchParams?.equery,
    searchParams?.etype,
    searchParams?.eprice,
    searchParams?.estatus
  );

  return (
    <main className="flex flex-col">
      <div className="min-h-[600px]">
        <ListingHeader user={UserRole.HOST} type={ListingType.ACCOMMODATION} />
        <Listings
          user={UserRole.HOST}
          type={ListingType.ACCOMMODATION}
          listings={paginatedAccommodations?.listings ?? []}
          pagination={paginatedAccommodations?.pagination ?? null}
        />
      </div>
      <div className="mt-16 min-h-[600px]">
        <ListingHeader user={UserRole.HOST} type={ListingType.EXPERIENCE} />
        <Listings
          user={UserRole.HOST}
          type={ListingType.EXPERIENCE}
          listings={paginatedExperiences?.listings ?? []}
          pagination={paginatedExperiences?.pagination ?? null}
        />
      </div>
    </main>
  );
};

export default ListingsPage;

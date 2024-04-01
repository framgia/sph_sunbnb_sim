import ListingHeader from "@/app/components/listings/ListingHeader";
import Listings from "@/app/components/listings/Listings";
import {
  LISTINGS_DEFAULT_PAGE,
  LISTINGS_DEFAULT_SIZE
} from "@/app/interfaces/ListingsProps";
import { ListingType, UserRole } from "@/app/utils/enums";
import { getPublicExperiences } from "@/app/utils/helpers/experience/request";
import React from "react";

const ExperiencesPage: React.FC = async ({
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
  const paginatedExperiences = await getPublicExperiences(
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
      <ListingHeader user={UserRole.GUEST} type={ListingType.EXPERIENCE} />
      <Listings
        user={UserRole.GUEST}
        type={ListingType.EXPERIENCE}
        listings={paginatedExperiences?.listings ?? []}
        pagination={paginatedExperiences?.pagination ?? null}
      />
    </main>
  );
};

export default ExperiencesPage;

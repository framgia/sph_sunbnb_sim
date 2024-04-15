import React from "react";
import ListingsGrid from "./ListingsGrid";
import { getAllListings } from "@/app/utils/helpers/approval/request";
import type { Listing, PaginationType } from "@/app/interfaces/types";

const ListingsPage: React.FC = async ({
  searchParams
}: {
  searchParams?: {
    page?: number;
    query?: string;
    listableType?: string;
    status?: string;
  };
}) => {
  let listingsData: { listings: Listing[]; paginate: PaginationType } | null =
    null;
  try {
    listingsData = await getAllListings(
      searchParams?.page,
      searchParams?.query,
      searchParams?.listableType,
      searchParams?.status
    );
  } catch {
    console.error("Error in fetch");
  }

  return (
    <>
      <span className="text-2xl font-bold">Listings</span>
      <ListingsGrid
        listings={listingsData?.listings ?? []}
        paginate={listingsData?.paginate ?? null}
        page={searchParams?.page ?? 1}
      />
    </>
  );
};

export default ListingsPage;

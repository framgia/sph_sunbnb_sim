import React from "react";
import ListingsGrid from "./ListingsGrid";
import { getAllListings } from "@/app/utils/helpers/approval/request";
import { Listing, PaginationType } from "@/app/interfaces/types";

const ListingsPage: React.FC = async ({
  searchParams
}: {
  searchParams?: {
    page?: number;
    query?: string;
  };
}) => {
  //  add filter param when filter in implented on backend for filter functionalities on integration
  let listingsData: { listings: Listing[]; paginate: PaginationType } | null =
    null;
  try {
    listingsData = await getAllListings(
      searchParams?.page,
      searchParams?.query
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
      />
    </>
  );
};

export default ListingsPage;

import React from "react";
import PopularListingCard from "./PopularListingCard";
import type { Listing } from "@/app/interfaces/types";

const PopularListings: React.FC<{
  listings: Listing[];
}> = ({ listings }) => {
  const top3 = listings.slice(0, 3);

  return (
    <div className="mt-3 flex h-56 w-full flex-row">
      {listings.length > 0 ? (
        <>
          <div className="mr-2 w-1/3">
            <PopularListingCard listing={top3[0]} />
          </div>
          <div className="mr-2 w-1/3">
            <PopularListingCard listing={top3[1]} />
          </div>
          <div className="w-1/3">
            <PopularListingCard listing={top3[2]} />
          </div>
        </>
      ) : (
        <p className="text-center text-zinc-500">
          No popular listings available.
        </p>
      )}
    </div>
  );
};

export default PopularListings;

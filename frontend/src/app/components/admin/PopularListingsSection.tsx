import React from "react";
import PopularListingCard from "./PopularListingCard";
import type { Listing } from "@/app/interfaces/types";
import { ScrollShadow } from "@nextui-org/react";

const PopularListings: React.FC<{
  listings: Listing[];
}> = ({ listings }) => {
  const top3 = listings.slice(0, 3);

  return (
    <ScrollShadow
      hideScrollBar
      offset={100}
      orientation="horizontal"
      className="max-w-full"
    >
      <div className="mt-3 flex h-60 w-[1000px] flex-row md:h-56 md:w-full">
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
          <p className="w-full text-center text-zinc-500">
            No popular listings available.
          </p>
        )}
      </div>
    </ScrollShadow>
  );
};

export default PopularListings;

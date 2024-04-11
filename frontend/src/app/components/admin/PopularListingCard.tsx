import { Listing } from "@/app/interfaces/types";
import Image from "next/image";
import React from "react";

const PopularListingCard: React.FC<{
  listing: Listing;
}> = ({ listing }) => {
  return (
    <div className="flex cursor-pointer flex-col rounded-2xl">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-t from-primary from-20% to-white">
        <div className="relative h-56 w-80 overflow-hidden rounded-2xl duration-300 hover:h-60 hover:w-[325px] hover:opacity-80">
          <Image
            src={listing.media[0].media.replace(/["\[\]"]/g, "")}
            fill
            alt="listing image"
          />
          <div className="absolute inset-0 z-10 flex items-end justify-start p-5 text-xl font-semibold text-white opacity-0 duration-300 hover:opacity-100">
            <span>{listing.name} </span>
            <span className="ml-2 text-sm font-normal">
              by {listing.user.first_name} {listing.user.last_name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularListingCard;

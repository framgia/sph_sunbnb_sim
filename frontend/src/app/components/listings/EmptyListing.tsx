import React from "react";
import { useSearchParams } from "next/navigation";
import { type EmptyListingProps } from "@/app/interfaces/ListingsProps";
import { ListingType, UserRole } from "@/app/utils/enums";

const EmptyListing: React.FC<EmptyListingProps> = ({ user, type }) => {
  const searchParams = useSearchParams();
  const prefix =
    user === UserRole.GUEST
      ? ""
      : user === UserRole.HOST
        ? type === ListingType.ACCOMMODATION
          ? "a"
          : "e"
        : "";
  return (
    <div className="min-h-56 w-full">
      <p className="mx-auto text-center text-zinc-500">
        No {type.toLowerCase()}s available.
        {searchParams.get(`${prefix}query`) !== null ||
        searchParams.get(`${prefix}type`) !== null ||
        searchParams.get(`${prefix}price`) !== null ||
        searchParams.get(`${prefix}rating`) !== null ||
        searchParams.get(`${prefix}date`) !== null ||
        searchParams.get(`${prefix}status`) !== null
          ? " Try changing your filter parameters."
          : ""}
      </p>
    </div>
  );
};

export default EmptyListing;

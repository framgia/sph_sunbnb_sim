import React from "react";
import ListingSearchBar from "./ListingSearchBar";
import { type ListingHeaderProps } from "@/app/interfaces/ListingsProps";
import AccommodationTypes from "../accommodation/AccommodationTypes";
import { UserRole } from "@/app/utils/enums";
import AddNewListingButton from "./AddNewListingButton";

const ListingHeader: React.FC<ListingHeaderProps> = ({ user, type }) => {
  return (
    <div className="my-5 mt-[-20px] flex flex-col">
      <div className="mx-[-9999px] bg-primary py-10 text-center text-4xl font-bold uppercase text-white">
        {type}
      </div>
      <ListingSearchBar user={user} type={type} />
      {user === UserRole.GUEST ? (
        <div className="h-28">
          <AccommodationTypes />
        </div>
      ) : null}
      {user === UserRole.HOST ? <AddNewListingButton type={type} /> : null}
    </div>
  );
};

export default ListingHeader;

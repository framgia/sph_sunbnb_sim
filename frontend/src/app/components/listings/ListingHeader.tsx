import React from "react";
import ListingSearchBar from "./ListingSearchBar";
import { type ListingHeaderProps } from "@/app/interfaces/ListingsProps";
import AccommodationTypes from "../accommodation/AccommodationTypes";
import { ListingType, UserRole } from "@/app/utils/enums";
import AddNewListingButton from "./AddNewListingButton";
import ExperienceTypes from "../experience/ExperienceTypes";

const ListingHeader: React.FC<ListingHeaderProps> = ({ user, type }) => {
  return (
    <div className="mt-[-20px] flex flex-col">
      <div className="mx-[-9999px] bg-primary py-10 text-center text-2xl font-bold uppercase text-white md:text-3xl">
        {`${type}S`}
      </div>
      <ListingSearchBar user={user} type={type} />
      {user === UserRole.GUEST ? (
        type === ListingType.ACCOMMODATION ? (
          <div className="mb-2 h-28 md:mb-0">
            <AccommodationTypes />
          </div>
        ) : (
          <div className="mb-3">
            <ExperienceTypes />
          </div>
        )
      ) : null}
      {user === UserRole.HOST ? <AddNewListingButton type={type} /> : null}
    </div>
  );
};

export default ListingHeader;

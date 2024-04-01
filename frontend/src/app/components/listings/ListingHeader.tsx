import React from "react";
import ListingSearchBar from "./ListingSearchBar";
import { type ListingHeaderProps } from "@/app/interfaces/ListingsProps";
import AccommodationTypes from "../accommodation/AccommodationTypes";
import { ListingType, UserRole } from "@/app/utils/enums";
import AddNewListingButton from "./AddNewListingButton";
import ExperienceTypes from "../experience/ExperienceTypes";

const ListingHeader: React.FC<ListingHeaderProps> = ({ user, type }) => {
  return (
    <div className="my-5 mt-[-20px] flex flex-col">
      <div className="bg-primary py-10 text-center text-4xl font-bold uppercase text-white">
        {`${type}S`}
      </div>
      <ListingSearchBar user={user} type={type} />
      {user === UserRole.GUEST ? (
        type === ListingType.ACCOMMODATION ? (
          <div className="h-28">
            <AccommodationTypes />
          </div>
        ) : (
          <div className="h-16">
            <ExperienceTypes />
          </div>
        )
      ) : null}
      {user === UserRole.HOST ? <AddNewListingButton type={type} /> : null}
    </div>
  );
};

export default ListingHeader;

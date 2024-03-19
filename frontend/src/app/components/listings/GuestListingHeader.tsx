"use client";
import React from "react";
import ListingSearchBar from "./ListingSearchBar";
import { type GuestListingsProps } from "@/app/interfaces/ListingsProps";
import AccommodationTypes from "../accommodation/AccommodationTypes";

const GuestListingHeader: React.FC<GuestListingsProps> = ({ type }) => {
  return (
    <div className="my-5 mt-[-20px] flex flex-col">
      <div className="mx-[-9999px] bg-primary py-10 text-center text-4xl font-bold uppercase text-white">
        {type}
      </div>
      <ListingSearchBar />
      <div className="h-28">
        <AccommodationTypes />
      </div>
    </div>
  );
};

export default GuestListingHeader;

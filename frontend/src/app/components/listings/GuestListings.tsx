"use client";
import React from "react";
import GuestListingItem from "./GuestListingItem";
import ListingPagination from "./ListingPagination";

const GuestListings: React.FC = () => {
  return (
    <div>
      <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
        {[1, 2, 3].map((_, index) => (
          <li key={index}>
            <GuestListingItem />
          </li>
        ))}
      </ul>
      <ListingPagination
        total={3}
        currentPage={1}
        perPage={3}
        type={"accommodations"}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />
    </div>
  );
};

export default GuestListings;

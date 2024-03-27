"use client";
import React from "react";
import ListingPagination from "./ListingPagination";
import { type ListingsProps } from "@/app/interfaces/ListingsProps";
import EmptyListing from "./EmptyListing";
import ListingItem from "./ListingItem";

const Listings: React.FC<ListingsProps> = ({
  user,
  type,
  listings,
  pagination
}) => {
  return (
    <div>
      {listings.length > 0 ? (
        <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          {listings.map((listing) => (
            <li key={listing.id}>
              <ListingItem user={user} type={type} listing={listing} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyListing user={user} type={type} />
      )}
      {pagination !== null && listings.length > 0 && (
        <ListingPagination
          user={user}
          type={type}
          total={pagination.total}
          currentPage={pagination.current_page}
          perPage={pagination.per_page}
        />
      )}
    </div>
  );
};

export default Listings;

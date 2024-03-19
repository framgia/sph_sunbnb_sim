import React from "react";
import { type HostListingsProps } from "@/app/interfaces/ListingsProps";
import HostListingItem from "./HostListingItem";
import ListingPagination from "./ListingPagination";

const HostListings: React.FC<HostListingsProps> = ({
  listings,
  pagination,
  type
}) => {
  return (
    <div>
      {listings.length > 0 ? (
        <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          {listings.map((listing) => (
            <li key={listing.id}>
              <HostListingItem listing={listing} type={type} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="min-h-56 w-full">
          <p className="mx-auto text-center text-zinc-500">
            No {type} available.
          </p>
        </div>
      )}
      {pagination !== null && (
        <ListingPagination
          total={pagination.total}
          currentPage={pagination.current_page}
          perPage={pagination.per_page}
          type={type}
        />
      )}
    </div>
  );
};

export default HostListings;

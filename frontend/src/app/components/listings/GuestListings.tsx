"use client";
import React, { useCallback } from "react";
import GuestListingItem from "./GuestListingItem";
import ListingPagination from "./ListingPagination";
import { type GuestListingsProps } from "@/app/interfaces/ListingsProps";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const GuestListings: React.FC<GuestListingsProps> = ({
  type,
  listings,
  pagination
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handlePageChange = useCallback(
    (page: number): void => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const handlePageSizeChange = useCallback(
    (size: number): void => {
      const params = new URLSearchParams(searchParams);
      params.set("limit", size.toString());
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  return (
    <div>
      {listings.length > 0 ? (
        <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          {listings.map((listing) => (
            <li key={listing.id}>
              <GuestListingItem listing={listing} type={type} />
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
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
};

export default GuestListings;

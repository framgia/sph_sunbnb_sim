"use client";
import React, { useCallback } from "react";
import { type HostListingsProps } from "@/app/interfaces/ListingsProps";
import HostListingItem from "./HostListingItem";
import ListingPagination from "./ListingPagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const HostListings: React.FC<HostListingsProps> = ({
  listings,
  pagination,
  type
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handlePageChange = useCallback(
    (page: number): void => {
      const params = new URLSearchParams(searchParams);
      if (type === "accommodations") {
        params.set("apage", page.toString());
      } else {
        params.set("epage", page.toString());
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router, type]
  );

  const handlePageSizeChange = useCallback(
    (size: number): void => {
      const params = new URLSearchParams(searchParams);
      if (type === "accommodations") {
        params.set("asize", size.toString());
        params.set("apage", "1");
      } else {
        params.set("esize", size.toString());
        params.set("epage", "1");
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router, type]
  );

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
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
};

export default HostListings;

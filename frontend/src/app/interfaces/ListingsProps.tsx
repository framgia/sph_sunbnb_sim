import { type Pagination, type Listing } from "./types";

export const LISTINGS_PAGE_SIZES = [3, 6];
export const LISTINGS_DEFAULT_PAGE = 1;
export const LISTINGS_DEFAULT_SIZE = 3;

export interface HostListingsProps {
  listings: Listing[];
  pagination: Pagination | null;
  page: number;
  size: number;
  type: "accommodations" | "experiences";
}

export interface HostListingItemProps {
  listing: Listing;
  type: "accommodations" | "experiences";
}

export interface HostingListingsSkeletonProps {
  number: number;
}

export interface ListingHeaderProps {
  type: "accommodations" | "experiences";
}

export interface ListingPaginationProps {
  total: number;
  currentPage: number;
  perPage: number;
  type: "accommodations" | "experiences";
}

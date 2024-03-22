import { type Pagination, type Listing, type ListingFilter } from "./types";

export const LISTINGS_PAGE_SIZES = [3, 6];
export const LISTINGS_DEFAULT_PAGE = 1;
export const LISTINGS_DEFAULT_SIZE = 3;
export const MIN_PRICE = 0;
export const MAX_PRICE = 100000;
export const MIN_RATING = 0;
export const MAX_RATING = 5;
export const MIN_DATE = new Date(new Date().setHours(24, 0, 0, 0));
export const INITIAL_FILTER: ListingFilter = {
  query: "",
  price: {
    min: 0,
    max: 100000
  },
  rating: {
    min: 0,
    max: 5
  },
  date: [
    {
      startDate: MIN_DATE,
      endDate: undefined,
      key: "selection"
    }
  ]
};

export interface HostListingsProps {
  listings: Listing[];
  pagination: Pagination | null;
  type: "accommodations" | "experiences";
}

export interface HostListingItemProps {
  listing: Listing;
  type: "accommodations" | "experiences";
}

export interface HostingListingsSkeletonProps {
  number: number;
}

export interface HostListingHeaderProps {
  type: "accommodations" | "experiences";
}

export interface ListingPaginationProps {
  total: number;
  currentPage: number;
  perPage: number;
  type: "accommodations" | "experiences";
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export interface GuestListingHeaderProps {
  type: "accommodations" | "experiences";
}

export interface GuestListingsProps {
  listings: Listing[];
  pagination: Pagination | null;
  type: "accommodations" | "experiences";
}

export interface GuestListingItemProps {
  listing: Listing;
  type: "accommodations" | "experiences";
}

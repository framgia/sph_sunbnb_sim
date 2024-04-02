import { type ListingType, type UserRole } from "../utils/enums";
import { type PaginationType, type Listing, type ListingFilter } from "./types";

export const LISTINGS_PAGE_SIZES = [3, 6];
export const LISTINGS_DEFAULT_PAGE = 1;
export const LISTINGS_DEFAULT_SIZE = 3;
export const MIN_PRICE = 0;
export const MAX_PRICE = 100000;
export const MIN_RATING = 0;
export const MAX_RATING = 5;
export const MIN_DATE = new Date(new Date().setHours(0, 0, 0, 0));
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
  ],
  status: "all",
  type: "all"
};
export interface ListingHeaderProps {
  user: UserRole;
  type: ListingType;
}

export interface AddNewListingButtonProps {
  type: ListingType;
}

export interface ListingSearchBarProps {
  user: UserRole;
  type: ListingType;
}

export interface ListingsProps {
  user: UserRole;
  type: ListingType;
  listings: Listing[];
  pagination: PaginationType | null;
}

export interface ListingItemProps {
  user: UserRole;
  type: ListingType;
  listing: Listing;
}
export interface EmptyListingProps {
  user: UserRole;
  type: ListingType;
}

export interface ListingPaginationProps {
  user: UserRole;
  type: ListingType;
  total: number;
  currentPage: number;
  perPage: number;
}

export interface PaginationProps {
  total: number;
  currentPage: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

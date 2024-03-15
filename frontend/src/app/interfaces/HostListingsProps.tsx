import { type Listing } from "./types";

export interface HostListingsProps {
  page: number;
  size: number;
  type: "accommodations" | "experiences";
}

export interface HostListingItemProps {
  listing: Listing;
  type: "accommodations" | "experiences";
}

export interface ListingHeaderProps {
  type: "accommodations" | "experiences";
}

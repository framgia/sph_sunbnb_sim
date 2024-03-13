import { type AvailabilityListing } from "./AvailabilityCalendarProps";

export interface ListingDropdownProps {
  listings: AvailabilityListing[];
  selectedListing: AvailabilityListing;
  onSelect: (listing: AvailabilityListing) => void;
}

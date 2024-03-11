export interface ListingDropdownProps {
  listings: string[];
  selectedListing: string;
  onSelect: (listing: string) => void;
}

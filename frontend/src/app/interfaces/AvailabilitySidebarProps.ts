import { type AvailabilityListing } from "./AvailabilityCalendarProps";

export interface AvailabilitySidebarProps {
  selectedDates: Date[];
  blockedDates: Date[];
  selectedListing: AvailabilityListing;
  onTabChange: (changed: boolean) => void;
}

import { type CalendarDate } from "./types";

export interface AvailabilityCalendarProps {
  listings: AvailabilityListing[];
}

export interface AvailabilityListing {
  id: number;
  name: string;
  price: number;
}

export interface AvailabilitySidebarProps {
  selectedDates: Date[];
  blockedDates: CalendarDate[];
  selectedListing: AvailabilityListing;
  onTabChange: (changed: boolean) => void;
}

export interface ListingDropdownProps {
  listings: AvailabilityListing[];
  selectedListing: AvailabilityListing;
  onSelect: (listing: AvailabilityListing) => void;
}

export interface CalendarProps {
  selectedDates: Date[];
  blockedDates: CalendarDate[];
  onSelect: (dates: Date[]) => void;
}

export interface CalendarDateButtonProps {
  date: Date;
  isCurrentMonth: boolean;
  isSelectedDate: boolean;
  isBlockedDate: boolean;
  onDateClick: (date: Date) => void;
}

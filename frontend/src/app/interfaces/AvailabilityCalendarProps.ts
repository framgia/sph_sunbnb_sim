export interface AvailabilityCalendarProps {
  listings: AvailabilityListing[];
}

export interface AvailabilityListing {
  id: number;
  name: string;
  price: number;
}

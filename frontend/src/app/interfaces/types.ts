import type { JwtPayload } from "jwt-decode";
import type {
  UserRole,
  Amenity,
  AccommodationType,
  ListingStatus,
  Inclusion,
  Language,
  BookingStatus,
  ExperienceType
} from "../utils/enums";

export interface MediaType {
  id: number;
  listing_id: number;
  media: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface UserRegisterType {
  first_name: string;
  last_name: string;
  email: string;
  role: "host" | "guest";
  password: string;
  password_confirmation: string;
}

export interface UserSessionType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  provider?: string;
  status: "active" | "banned";
}

export interface PasswordUpdateType {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface UserDetailsType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at?: string;
  role: UserRole;
  provider?: string;
  provider_id?: number;
  status: "active" | "banned";
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Accommodation {
  id: number;
  type: AccommodationType;
  bed_count: number;
  bedroom_count: number;
  bathroom_count: number;
  minimum_days: number;
  maximum_days: number;
  amenities: Amenity[];
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export interface Experience {
  id: number;
  type: string;
  start_time: string;
  end_time: string;
  language: Language[];
  inclusions: Inclusion[];
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface Listing {
  id: number;
  user_id: number;
  user: UserDetailsType;
  status: ListingStatus;
  name: string;
  description: string;
  province: string;
  city: string;
  barangay: string;
  street: string;
  zip_code: number;
  price: number;
  maximum_guests: number;
  listable_type: string;
  listable_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  listable: Accommodation;
  media: MediaType[];
}

export interface ExperienceListing {
  id: number;
  user_id: number;
  user: UserDetailsType;
  status: ListingStatus;
  name: string;
  description: string;
  province: string;
  city: string;
  barangay: string;
  street: string;
  zip_code: number;
  price: number;
  maximum_guests: number;
  listable_type: string;
  listable_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  listable: Experience;
  media: MediaType[];
}

export interface BookingHistoryResponse {
  pagination: PaginationType;
  bookings: BookingHistory[];
}
export interface BookingHistory {
  id: number;
  user_id: number;
  listing_id: number;
  start_date: string;
  end_date: string;
  number_of_guests: number;
  total_price: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  listing: Listing;
  reviewed: boolean;
}

/* Must be created since typing listable as Accommodation | Experience in Listing will only allow 
  assignment of values overlapping Accommodation and Experience Type  */
export interface Listing_Experience {
  id: number;
  user_id: number;
  user: UserDetailsType;
  status: ListingStatus;
  name: string;
  description: string;
  province: string;
  city: string;
  barangay: string;
  street: string;
  zip_code: number;
  price: number;
  maximum_guests: number;
  listable_type: string;
  listable_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  listable: Experience;
  media: MediaType[];
}

export interface PaginationType {
  current_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  path: string;
  prev_page_url: string | null;
  to: number;
}

export interface PaginatedListing {
  listings: Listing[];
  pagination: PaginationType;
}

export interface CalendarDate {
  date: Date | string;
  available: boolean;
}

export interface JwtPayloadwithUser extends JwtPayload {
  user: UserSessionType;
}

export interface ReviewType {
  created_at: string;
  overall_rating: number;
  cleanliness_rating: number;
  location_rating: number;
  value_rating: number;
  comment: string;
  user: {
    first_name: string;
    last_name: string;
  };
}

export interface AccommodationReviewData {
  cleanliness_rating: number;
  location_rating: number;
  value_rating: number;
  comment: string;
}

export interface BookingResponse {
  bookings: BookingType[];
  pagination: PaginationType;
}
export interface BookingType {
  id: number;
  user_id: number;
  listing_id: number;
  start_date: string;
  end_date: string;
  number_of_guests: number;
  total_price: number;
  status: BookingStatus;
  host_deleted: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  user: UserDetailsType;
  pagination: PaginationType;
}

export interface ExperienceReviewData {
  overall_rating: number;
  comment: string;
}

export interface ListingFilter {
  query: string;
  price: {
    min: number;
    max: number;
  };
  rating: {
    min: number;
    max: number;
  };
  date: [
    {
      startDate: Date;
      endDate: Date | undefined;
      key: string;
    }
  ];
  status: ListingStatus | "all";
  type: AccommodationType | ExperienceType | "all";
}

export interface BookingData {
  start_date: string;
  end_date: string;
  number_of_guests: number;
  listing_id: number;
}

export interface HostBookingFilters {
  status: string;
  search: string;
  per_page: string;
}

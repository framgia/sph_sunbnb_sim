import type { JwtPayload } from "jwt-decode";
import {
  UserRole,
  Amenity,
  AccommodationType,
  ListingStatus,
  Inclusion,
  Language,
  BookingStatus,
  ExperienceType,
  Reason,
  ReportStatus
} from "../utils/enums";
import { type Range } from "react-date-range";

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

export interface PasswordUpdateType {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface JwtPayloadwithUser extends JwtPayload {
  user: UserSessionType;
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
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  media: MediaType[];
  listable_type: string;
  listable_id: number;
}

export interface ExperienceListing extends Listing {
  listable: Experience;
}

export interface AccommodationListing extends Listing {
  listable: Accommodation;
}

export interface MediaType {
  id: number;
  listing_id: number;
  media: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
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

export interface ExperienceReviewData {
  overall_rating: number;
  comment: string;
}

export interface ReviewResponse {
  reviews: ReviewType[];
  metadata: ReviewMetadata;
  pagination: PaginationType;
}

export interface ReviewMetadata {
  total_reviews: number;
  ratings_count: Record<string, number>;
  average_cleanliness: number | null;
  average_location: number | null;
  average_value: number | null;
}

export interface Booking {
  id: number;
  user_id: number;
  listing_id: number;
  start_date: string;
  end_date: string;
  number_of_guests: number;
  total_price: number;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  host_deleted: number;
  reviewed: boolean;
}

export interface BookingType extends Booking {
  user: UserDetailsType;
  pagination: PaginationType;
}

export interface BookingHistory extends Booking {
  listing: Listing;
  reviewed: boolean;
}

export interface BookingHistoryResponse {
  pagination: PaginationType;
  bookings: BookingHistory[];
}

export interface BookingResponse {
  bookings: BookingType[];
  pagination: PaginationType;
}

export interface BookingData {
  start_date: string;
  end_date: string;
  number_of_guests: number;
  listing_id: number;
}

export interface Report {
  id: number;
  user_id: number;
  listing_id: number;
  admin_id: number | null;
  content: string;
  status: ReportStatus;
  reason: Reason;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: UserDetailsType;
  listing: Listing;
  admin?: Admin | null;
}

export interface ReportData {
  content: string;
  reason: Reason;
}

export interface ReportResponse {
  reports: Report[];
  pagination: PaginationType;
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

export interface ListingFilter {
  price: {
    min: number;
    max: number;
  };
  rating: {
    min: number;
    max: number;
  };
  date: Range[];
  status: ListingStatus | "all";
  type: AccommodationType | ExperienceType | "all";
}

export interface BookingFilters {
  status: string;
  search: string;
  per_page: string;
  sort: string;
}

export interface ReportFilters {
  status: ReportStatus;
  reason: string;
  type: string;
  sort: string;
  page: number;
  search: string;
}

export interface CalendarDate {
  date: Date | string;
  available: boolean;
  booking: {
    user: {
      first_name: string;
      last_name: string;
    };
  };
}

export interface Admin {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface UserAdminResponse {
  id: number;
  first_name: string;
  last_name: string;
  role: UserRole;
  status: "active" | "banned";
  email: string;
  email_verified_at: string;
  provider: string;
  provider_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  reason: string;
  listings?: Listing[] | null;
  bookings?: BookingAdmin[] | null;
}

export interface BookingAdmin extends Booking {
  listing: Listing;
}
export interface AdminAnalytics {
  users: {
    host: number;
    guest: number;
    admin: number;
    traffic: {
      month: string;
      users: number[];
    };
  };
  bookings: {
    pending: number;
    upcoming: number;
    done: number;
    cancelled: number;
    refused: number;
    value: number;
  };
  listings: {
    pending: number;
    active: number;
    refused: number;
    popular: Listing[];
  };
}

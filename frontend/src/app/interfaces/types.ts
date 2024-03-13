import type {
  UserRole,
  Amenity,
  AccommodationType,
  ListingStatus
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

export interface Listing {
  id: number;
  user_id: number;
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

export interface CalendarDate {
  date: Date | string;
  available: boolean;
}

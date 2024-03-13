import type { UserRole } from "../utils/enums";

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

export interface UserUpdateType {
  first_name: string;
  last_name: string;
  email: string;
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

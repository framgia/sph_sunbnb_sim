import type { UserDetailsType } from "./types";

export interface ProfileFieldProps {
  user: UserDetailsType;
  onEdit: () => void;
  onCancel: () => void;
  enabled: boolean;
}

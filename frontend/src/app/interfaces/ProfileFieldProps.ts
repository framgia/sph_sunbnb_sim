import { UserSessionType } from "./types";

export interface ProfileFieldProps {
  user: UserSessionType;
  onEdit: () => void;
  onCancel: () => void;
  enabled: boolean;
}

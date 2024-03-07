import { type NavbarPosition, type UserRole } from "../utils/enums";

export interface NavbarProps {
    role: UserRole;
    position?: NavbarPosition;
}

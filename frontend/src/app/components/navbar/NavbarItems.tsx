import { NavbarContent } from "@nextui-org/react";
import React from "react";
import NavbarDropdown from "./NavbarDropdown";
import NavbarLinks from "./NavbarLinks";
import { UserRole } from "@/app/utils/enums";

interface NavbarItemsProps {
  userRole: UserRole;
  userFullName: string;
}
const NavbarItems: React.FC<NavbarItemsProps> = ({
  userRole,
  userFullName
}) => {
  return (
    <>
      <NavbarContent justify="center" className="hidden sm:flex">
        <NavbarLinks role={userRole} />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarDropdown role={userRole} full_name={userFullName} />
      </NavbarContent>
    </>
  );
};

export default NavbarItems;

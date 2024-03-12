import { NavbarContent } from "@nextui-org/react";
import React from "react";
import NavbarDropdown from "./NavbarDropdown";
import NavbarLinks from "./NavbarLinks";
import { UserRole } from "@/app/utils/enums";

interface NavbarItemsProps {
  userRole: UserRole;
}
const NavbarItems: React.FC<NavbarItemsProps> = ({ userRole }) => {
  return (
    <>
      <NavbarContent justify="center" className="hidden sm:flex">
        {/* TODO: Fetch user role from logged in user */}
        <NavbarLinks role={userRole} />
      </NavbarContent>
      <NavbarContent justify="end">
        {/* TODO: Fetch user role from logged in user */}
        <NavbarDropdown role={userRole} />
      </NavbarContent>
    </>
  );
};

export default NavbarItems;

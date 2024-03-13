import React from "react";
import {
  NavbarBrand,
  NavbarContent,
  Navbar as NextUINavbar
} from "@nextui-org/react";
import LogoNavbarIcon from "../svgs/Navbar/LogoNavbarIcon";
import Link from "next/link";
import { checkCookies } from "@/app/utils/helpers/userHelper";
import { UserRole } from "@/app/utils/enums";
import NavbarLinks from "./NavbarLinks";
import NavbarDropdown from "./NavbarDropdown";

const Navbar: React.FC = async () => {
  const user = await checkCookies();
  return (
    <NextUINavbar className="shadow-md" isBlurred={false}>
      <NavbarBrand>
        <Link href="/">
          <LogoNavbarIcon />
        </Link>
      </NavbarBrand>
      {user !== null ? (
        <>
          <NavbarContent justify="center" className="hidden sm:flex">
            <NavbarLinks role={user.role} />
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarDropdown
              role={user.role}
              full_name={user.first_name + " " + user.last_name}
            />
          </NavbarContent>
        </>
      ) : (
        <>
          <NavbarContent justify="center" className="hidden sm:flex">
            <NavbarLinks role={UserRole.GUEST} />
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarDropdown role={UserRole.DEFAULT} />
          </NavbarContent>
        </>
      )}
    </NextUINavbar>
  );
};

export default Navbar;

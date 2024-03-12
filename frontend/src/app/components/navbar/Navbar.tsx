import React from "react";
import { NavbarBrand, Navbar as NextUINavbar } from "@nextui-org/react";
import LogoNavbarIcon from "../svgs/Navbar/LogoNavbarIcon";
import Link from "next/link";
import { UserRole } from "@/app/utils/enums";
import NavbarItems from "./NavbarItems";
import { checkCookies } from "@/app/utils/userHelper";

const Navbar: React.FC = () => {
  const user = checkCookies();
  return (
    <NextUINavbar className="shadow-md" isBlurred={false}>
      <NavbarBrand>
        <Link href="/">
          <LogoNavbarIcon />
        </Link>
      </NavbarBrand>
      <NavbarItems userRole={UserRole.HOST} />
    </NextUINavbar>
  );
};

export default Navbar;

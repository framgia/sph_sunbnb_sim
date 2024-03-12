import React from "react";
import { NavbarBrand, Navbar as NextUINavbar } from "@nextui-org/react";
import LogoNavbarIcon from "../svgs/Navbar/LogoNavbarIcon";
import Link from "next/link";
import NavbarItems from "./NavbarItems";
import { checkCookies } from "@/app/utils/userHelper";

const Navbar: React.FC = async () => {
  const user = await checkCookies();
  console.log("nav user:", user);
  return (
    <NextUINavbar className="shadow-md" isBlurred={false}>
      <NavbarBrand>
        <Link href="/">
          <LogoNavbarIcon />
        </Link>
      </NavbarBrand>
      {user !== null ? (
        <NavbarItems
          userRole={user.role}
          userFullName={user.first_name + " " + user.last_name}
        />
      ) : (
        <></>
      )}
    </NextUINavbar>
  );
};

export default Navbar;

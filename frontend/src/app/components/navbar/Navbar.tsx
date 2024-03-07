import React from "react";
import {
    NavbarBrand,
    NavbarContent,
    Navbar as NextUINavbar
} from "@nextui-org/react";
import LogoNavbarIcon from "../svgs/Navbar/LogoNavbarIcon";
import Link from "next/link";
import NavbarDropdown from "./NavbarDropdown";
import { UserRole } from "@/app/utils/enums";
import NavbarLinks from "./NavbarLinks";

const Navbar: React.FC = () => {
    const role = UserRole.HOST; // TODO: get user role from context

    return (
        <NextUINavbar>
            <NavbarBrand>
                <Link href="/">
                    <LogoNavbarIcon />
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center" className="hidden sm:flex">
                <NavbarLinks role={role} />
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarDropdown role={role} />
            </NavbarContent>
        </NextUINavbar>
    );
};

export default Navbar;

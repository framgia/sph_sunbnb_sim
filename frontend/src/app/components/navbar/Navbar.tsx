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
    return (
        <NextUINavbar className="shadow-md" isBlurred={false}>
            <NavbarBrand>
                <Link href="/">
                    <LogoNavbarIcon />
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center" className="hidden sm:flex">
                {/* TODO: Fetch user role from logged in user */}
                <NavbarLinks role={UserRole.HOST} />
            </NavbarContent>
            <NavbarContent justify="end">
                {/* TODO: Fetch user role from logged in user */}
                <NavbarDropdown role={UserRole.HOST} />
            </NavbarContent>
        </NextUINavbar>
    );
};

export default Navbar;

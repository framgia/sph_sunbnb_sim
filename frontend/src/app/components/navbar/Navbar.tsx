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
                <NavbarLinks role={UserRole.DEFAULT} />
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarDropdown role={UserRole.DEFAULT} />
            </NavbarContent>
        </NextUINavbar>
    );
};

export default Navbar;

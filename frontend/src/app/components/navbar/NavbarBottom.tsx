import { Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import NavbarLinks from "./NavbarLinks";
import { NavbarPosition, UserRole } from "@/app/utils/enums";

const NavbarBottom: React.FC = () => {
    const role = UserRole.HOST; // TODO: get user role from context

    return (
        <Navbar className="sm:hidden">
            <NavbarContent justify="center" className="w-full">
                <NavbarLinks role={role} position={NavbarPosition.BOTTOM} />
            </NavbarContent>
        </Navbar>
    );
};

export default NavbarBottom;

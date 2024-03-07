import { Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import NavbarLinks from "./NavbarLinks";
import { NavbarPosition, UserRole } from "@/app/utils/enums";

const NavbarBottom: React.FC = () => {
    return (
        <Navbar
            className="border-top sticky bottom-0 border sm:hidden"
            isBlurred={false}
        >
            <NavbarContent justify="center" className="w-full">
                <NavbarLinks
                    role={UserRole.ADMIN}
                    position={NavbarPosition.BOTTOM}
                />
            </NavbarContent>
        </Navbar>
    );
};

export default NavbarBottom;

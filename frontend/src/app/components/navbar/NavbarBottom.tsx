import { Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import NavbarLinks from "./NavbarLinks";
import { NavbarPosition, UserRole } from "@/app/utils/enums";
import { checkCookies } from "@/app/utils/helpers/userHelper";

const NavbarBottom: React.FC = async () => {
  const user = await checkCookies();

  return (
    <Navbar
      className="border-top sticky bottom-0 border md:!hidden"
      isBlurred={false}
    >
      <NavbarContent justify="center" className="w-full">
        {user !== undefined && user !== null ? (
          <NavbarLinks role={user.role} position={NavbarPosition.BOTTOM} />
        ) : (
          <NavbarLinks
            role={UserRole.DEFAULT}
            position={NavbarPosition.BOTTOM}
          />
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarBottom;

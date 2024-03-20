import { Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import NavbarLinks from "./NavbarLinks";
import { NavbarPosition } from "@/app/utils/enums";
import { checkCookies } from "@/app/utils/helpers/userHelper";
import { redirect } from "next/navigation";

const NavbarBottom: React.FC = async () => {
  const user = await checkCookies();

  return (
    <Navbar
      className="border-top sticky bottom-0 border sm:!hidden"
      isBlurred={false}
    >
      <NavbarContent justify="center" className="w-full">
        {user !== undefined && user !== null ? (
          <NavbarLinks role={user.role} position={NavbarPosition.BOTTOM} />
        ) : (
          redirect("/login")
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarBottom;

"use client";
import React from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger
} from "@nextui-org/react";
import MenuIcon from "../svgs/Navbar/MenuIcon";
import { UserRole } from "@/app/utils/enums";
import { type NavbarProps } from "@/app/interfaces/NavbarProps";
import { getInitials } from "@/app/utils/helpers/getInitials";
import { logoutUser } from "@/app/utils/helpers/userHelper";
import { useRouter } from "next/navigation";

interface NavbarDropdownProps extends NavbarProps {
  full_name: string;
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = (props) => {
  const router = useRouter();
  const actions = {
    host: [
      {
        path: "/listings/accommodations/new",
        label: "New Accommodation"
      },
      { path: "/listings/experiences/new", label: "New Experience" },
      { path: "/profile", label: "View Profile" }
    ],
    guest: [{ path: "/profile", label: "View Profile" }],
    admin: [{ path: "/profile", label: "View Profile" }],
    default: []
  };

  async function handleLogout(): Promise<void> {
    const logoutRes = await logoutUser();
    if (logoutRes.message === "Logged out successfully") {
      router.replace("/");
    }
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          radius="full"
          className="border px-3"
          startContent={<MenuIcon />}
          endContent={
            <Avatar
              name={props.full_name !== " " ? getInitials(props.full_name) : ""}
              className="h-7 w-7 text-tiny uppercase"
            />
          }
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions">
        <DropdownSection showDivider={props.role !== UserRole.DEFAULT}>
          {actions[props.role].map((action, index) => (
            <DropdownItem
              href={action.path}
              key={index}
              textValue={action.label}
            >
              {action.label}
            </DropdownItem>
          ))}
        </DropdownSection>

        {props.role !== UserRole.DEFAULT ? (
          <DropdownSection>
            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
              onClick={handleLogout}
            >
              Logout
            </DropdownItem>
          </DropdownSection>
        ) : (
          <DropdownSection>
            <DropdownItem href="/login" key="login" textValue="Login">
              Login
            </DropdownItem>
            <DropdownItem href="/signup" key="signup" textValue="Sign up">
              Sign Up
            </DropdownItem>
          </DropdownSection>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;

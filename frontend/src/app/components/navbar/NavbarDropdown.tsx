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
import Link from "next/link";
import { UserRole } from "@/app/utils/enums";
import { type NavbarProps } from "@/app/interfaces/NavbarProps";
const NavbarDropdown: React.FC<NavbarProps> = (props) => {
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

  function handleLogout(): void {
    // TODO: implement logout
    console.log("logout");
  }

  console.log(props.role);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          radius="full"
          className="border px-3"
          startContent={<MenuIcon />}
          endContent={
            <Avatar name="ja" className="h-7 w-7 text-tiny uppercase" />
          }
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions">
        <DropdownSection showDivider={props.role !== UserRole.DEFAULT}>
          {actions[props.role].map((action, index) => (
            <DropdownItem key={index} textValue={action.label}>
              <Link href={action.path}>{action.label}</Link>
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
            <DropdownItem key="login" textValue="Login">
              <Link href="/login">Login</Link>
            </DropdownItem>
            <DropdownItem key="signup" textValue="Sign up">
              <Link href="/signup">Sign Up</Link>
            </DropdownItem>
          </DropdownSection>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;

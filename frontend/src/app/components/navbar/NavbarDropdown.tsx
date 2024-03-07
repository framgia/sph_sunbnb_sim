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
            { path: "/accommodations/new", label: "New Accommodation" },
            { path: "/experience/new", label: "New Experience" },
            { path: "/profile", label: "Account" }
        ],
        guest: [{ path: "/profile", label: "Account" }],
        admin: [{ path: "/profile", label: "Account" }],
        default: []
    };

    function handleLogout(): void {
        console.log("logout");
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
                            name="ja"
                            className="h-7 w-7 text-tiny uppercase"
                        />
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
                        <DropdownItem key="login">
                            <Link href="/login">Login</Link>
                        </DropdownItem>
                        <DropdownItem key="signup">
                            <Link href="/signup">Sign Up</Link>
                        </DropdownItem>
                    </DropdownSection>
                )}
            </DropdownMenu>
        </Dropdown>
    );
};

export default NavbarDropdown;

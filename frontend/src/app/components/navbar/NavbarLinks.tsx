"use client";
import { NavbarPosition } from "@/app/utils/enums";
import { Link, NavbarItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";
import CalendarIcon from "../svgs/Navbar/CalendarIcon";
import HomeIcon from "../svgs/Navbar/HomeIcon";
import ListingsIcon from "../svgs/Navbar/ListingsIcon";
import AccommodationsIcon from "../svgs/Navbar/AccommodationsIcon";
import ReportsIcon from "../svgs/Navbar/ReportsIcon";
import UsersIcon from "../svgs/Navbar/UsersIcon";
import ExperiencesIcon from "../svgs/Navbar/ExperiencesIcon";
import HistoryIcon from "../svgs/Navbar/HistoryIcon";
import DashboardIcon from "../svgs/Navbar/DashboardIcon";
import { type NavbarProps } from "@/app/interfaces/NavbarProps";

const NavbarLinks: React.FC<NavbarProps> = (props) => {
  const pathname = usePathname();
  const links = {
    host: [
      { path: "/", label: "Home", icon: <HomeIcon /> },
      { path: "/calendar", label: "Calendar", icon: <CalendarIcon /> },
      { path: "/listings", label: "Listings", icon: <ListingsIcon /> }
    ],
    guest: [
      {
        path: "/accommodations",
        label: "Accommodations",
        icon: <AccommodationsIcon />
      },
      {
        path: "/experiences",
        label: "Experiences",
        icon: <ExperiencesIcon />
      },
      { path: "/history", label: "History", icon: <HistoryIcon /> }
    ],
    admin: [
      { path: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
      { path: "/approvals", label: "Approvals", icon: <ListingsIcon /> },
      { path: "/reports", label: "Reports", icon: <ReportsIcon /> },
      { path: "/users", label: "Users", icon: <UsersIcon /> }
    ],
    default: [
      {
        path: "/accommodations",
        label: "Accommodations",
        icon: <AccommodationsIcon />
      },
      {
        path: "/experiences",
        label: "Experiences",
        icon: <ExperiencesIcon />
      }
    ]
  };

  return (
    <>
      {links[props.role].map((link, index) => (
        <NavbarItem key={index}>
          {props.position === NavbarPosition.BOTTOM ? (
            <Link
              href={link.path}
              className={`${pathname === link.path ? "text-primary" : "text-black"} flex w-fit flex-col items-center px-3 text-medium text-sm font-semibold`}
            >
              {link.icon}
              <span className="mt-1">
                {link.label === "Accommodations" ? "Accomm" : link.label}
              </span>
            </Link>
          ) : (
            <Link
              href={link.path}
              className="flex w-fit flex-col items-center px-4 text-medium text-sm font-semibold text-black"
            >
              <span>{link.label}</span>
              <div
                className={`h-1 w-7 rounded-full ${pathname === link.path ? "bg-primary text-primary" : ""}`}
              />
            </Link>
          )}
        </NavbarItem>
      ))}
    </>
  );
};

export default NavbarLinks;

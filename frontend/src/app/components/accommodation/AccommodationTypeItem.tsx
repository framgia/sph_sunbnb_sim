"use client";
import React, { useCallback } from "react";
import BeachHouseIcon from "../svgs/Accommodation Types/BeachHouseIcon";
import CabinIcon from "../svgs/Accommodation Types/CabinIcon";
import CondominiumIcon from "../svgs/Accommodation Types/CondominiumIcon";
import FarmIcon from "../svgs/Accommodation Types/FarmIcon";
import HotelIcon from "../svgs/Accommodation Types/HotelIcon";
import MansionIcon from "../svgs/Accommodation Types/MansionIcon";
import OthersIcon from "../svgs/Accommodation Types/OthersIcon";
import RoomIcon from "../svgs/Accommodation Types/RoomIcon";
import TinyHouseIcon from "../svgs/Accommodation Types/TinyHouseIcon";
import TowerIcon from "../svgs/Accommodation Types/TowerIcon";
import DashboardIcon from "../svgs/Navbar/DashboardIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface AccommodationTypeItemProp {
  accommodation: string;
}

const AccommodationTypeItem: React.FC<AccommodationTypeItemProp> = ({
  accommodation
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const accommodationTypes = [
    { name: "All", icon: <DashboardIcon /> },
    { name: "Beach House", icon: <BeachHouseIcon /> },
    { name: "Cabin", icon: <CabinIcon /> },
    { name: "Condominium", icon: <CondominiumIcon /> },
    { name: "Farm", icon: <FarmIcon /> },
    { name: "Hotel", icon: <HotelIcon /> },
    { name: "Mansion", icon: <MansionIcon /> },
    { name: "Others", icon: <OthersIcon /> },
    { name: "Room", icon: <RoomIcon /> },
    { name: "Tiny House", icon: <TinyHouseIcon /> },
    { name: "Tower", icon: <TowerIcon /> }
  ];
  const accommodationTypeObj = accommodationTypes.find((accmdt) => {
    return accmdt.name === accommodation;
  });

  const handleSelectType = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (accommodation === "All") params.delete("type");
    else params.set("type", accommodation);
    router.replace(`${pathname}?${params.toString()}`);
  }, [accommodation, pathname, router, searchParams]);

  return (
    <div
      className={`${
        searchParams.get("type") === accommodation ||
        (searchParams.get("type") === null && accommodation === "All")
          ? "border-b-2 border-foreground-500 text-black"
          : "text-foreground-500"
      } ${"h-18 cursor-pointer items-center justify-center p-2 hover:border-b-2 hover:border-foreground-500 hover:text-black"}`}
      onClick={handleSelectType}
    >
      {accommodationTypeObj !== undefined ? (
        <div className="mx-2 flex w-auto flex-col">
          <div className="flex h-8 items-start justify-center">
            {accommodationTypeObj.icon}
          </div>
          <div className="h-18 items-end justify-end text-wrap text-center text-xs">
            {accommodationTypeObj.name}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AccommodationTypeItem;

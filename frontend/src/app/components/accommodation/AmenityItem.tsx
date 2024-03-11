import React from "react";
import type { ReactNode } from "react";
import KitchenIcon from "../svgs/Amenities/KitchenIcon";
import AirConIcon from "../svgs/Amenities/AirconIcon";
import BackyardIcon from "../svgs/Amenities/BackyardIcon";
import BalconyIcon from "../svgs/Amenities/BalconyIcon";
import BBQGrillIcon from "../svgs/Amenities/BBQGrillIcon";
import BeachAccessIcon from "../svgs/Amenities/BeachAccessIcon";
import CableIcon from "../svgs/Amenities/CableIcon";
import DryerIcon from "../svgs/Amenities/DryerIcon";
import FanIcon from "../svgs/Amenities/FanIcon";
import FireplaceIcon from "../svgs/Amenities/FireplaceIcon";
import GymIcon from "../svgs/Amenities/GymIcon";
import HeaterIcon from "../svgs/Amenities/HeaterIcon";
import IronIcon from "../svgs/Amenities/IronIcon";
import JacuzziIcon from "../svgs/Amenities/JacuzziIcon";
import ParkingIcon from "../svgs/Amenities/ParkingIcon";
import PetsAllowedIcon from "../svgs/Amenities/PetsAllowedIcon";
import PoolIcon from "../svgs/Amenities/PoolIcon";
import ShowerIcon from "../svgs/Amenities/ShowerIcon";
import TVIcon from "../svgs/Amenities/TVIcon";
import WasherIcon from "../svgs/Amenities/WasherIcon";
import WifiIcon from "../svgs/Amenities/WifiIcon";

interface AmenityComponentProps {
  amenity: string;
}
const AmenityComponent: React.FC<AmenityComponentProps> = ({ amenity }) => {
  const amenities = [
    { name: "Air Con", icon: <AirConIcon /> },
    { name: "Backyard", icon: <BackyardIcon /> },
    { name: "Balcony", icon: <BalconyIcon /> },
    { name: "BBQ Grill", icon: <BBQGrillIcon /> },
    { name: "Beach Access", icon: <BeachAccessIcon /> },
    { name: "Cable", icon: <CableIcon /> },
    { name: "Dryer", icon: DryerIcon },
    { name: "Fan", icon: <FanIcon /> },
    { name: "Indoor Fireplace", icon: <FireplaceIcon /> },
    { name: "Gym", icon: <GymIcon /> },
    { name: "Heater", icon: <HeaterIcon /> },
    { name: "Iron", icon: <IronIcon /> },
    { name: "Jacuzzi", icon: <JacuzziIcon /> },
    { name: "Kitchen", icon: <KitchenIcon /> },
    { name: "Parking", icon: <ParkingIcon /> },
    { name: "Pets Allowed", icon: <PetsAllowedIcon /> },
    { name: "Pool", icon: <PoolIcon /> },
    { name: "Shower", icon: <ShowerIcon /> },
    { name: "Television", icon: <TVIcon /> },
    { name: "Washer", icon: <WasherIcon /> },
    { name: "Wifi", icon: <WifiIcon /> }
  ];
  const amenityObj = amenities.find((amnty) => {
    return amnty.name === amenity;
  });
  return (
    <div>
      {amenityObj !== undefined ? (
        <div className="flex flex-row items-center">
          <div className="p-2">{amenityObj.icon as ReactNode}</div>
          <span className="text-sm leading-5">{amenityObj.name}</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AmenityComponent;

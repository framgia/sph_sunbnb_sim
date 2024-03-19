import React from "react";
import AmenityComponent from "./AmenityItem";
import { Button } from "@nextui-org/react";

interface AmenitySectionProps {
  amenities: string[];
}
const AmenitySection: React.FC<AmenitySectionProps> = ({ amenities }) => {
  return (
    <div>
      <span className="text-xl font-semibold">What this place offers</span>
      <div className="my-10 w-2/4">
        <div className="grid grid-cols-2">
          {amenities.slice(0, 6).map((amenity, i) => {
            return <AmenityComponent key={i} amenity={amenity} />;
          })}
        </div>
      </div>
      {amenities.length > 6 ? (
        <Button className="bg-primary-600 font-semibold text-white">
          Show All Amenities
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AmenitySection;

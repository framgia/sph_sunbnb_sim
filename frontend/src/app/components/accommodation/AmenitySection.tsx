"use client";
import React, { useState } from "react";
import AmenityComponent from "./AmenityItem";
import { Button } from "@nextui-org/react";

interface AmenitySectionProps {
  amenities: string[];
}
const AmenitySection: React.FC<AmenitySectionProps> = ({ amenities }) => {
  const [showAll, setShowAll] = useState(false);
  return (
    <div>
      <span className="text-xl font-semibold">What this place offers</span>
      <div className="my-10 md:w-6/12">
        <div className="justify between grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-x-40">
          {!showAll
            ? amenities.slice(0, 6).map((amenity, i) => {
                return <AmenityComponent key={i} amenity={amenity} />;
              })
            : amenities.map((amenity, i) => {
                return <AmenityComponent key={i} amenity={amenity} />;
              })}
        </div>
      </div>
      {amenities.length > 6 ? (
        !showAll ? (
          <Button
            className="bg-primary-600 font-semibold text-white"
            onPress={() => {
              setShowAll(true);
            }}
          >
            Show All Amenities
          </Button>
        ) : (
          <Button
            className="bg-primary-600 font-semibold text-white"
            onPress={() => {
              setShowAll(false);
            }}
          >
            Hide Amenities
          </Button>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default AmenitySection;

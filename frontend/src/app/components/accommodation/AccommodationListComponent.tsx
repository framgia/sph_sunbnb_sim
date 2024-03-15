import React from "react";
import AccommodationTypeItem from "./AccommodationTypeItem";

const AccommodationListComponent: React.FC = () => {
  const accommodationTypes = [
    "Beach House",
    "Cabin",
    "Condominium",
    "Farm",
    "Hotel",
    "Mansion",
    "Others",
    "Room",
    "Tiny House",
    "Tower"
  ];
  return (
    <div className="flex flex-row">
      {/* Probably paginate this to follo Airbnb */}
      {accommodationTypes.map((accommodationType, i) => {
        return (
          <AccommodationTypeItem key={i} accommodation={accommodationType} />
        );
      })}
    </div>
  );
};

export default AccommodationListComponent;

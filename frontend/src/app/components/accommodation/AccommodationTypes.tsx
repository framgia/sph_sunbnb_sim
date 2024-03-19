import React from "react";
import AccommodationTypeItem from "./AccommodationTypeItem";
import { AccommodationType } from "@/app/utils/enums";

const AccommodationTypes: React.FC = () => {
  return (
    <div className="mt-5 flex flex w-full justify-between overflow-x-auto">
      {Object.values(AccommodationType).map((type, index) => (
        <AccommodationTypeItem key={index} accommodation={type} />
      ))}
    </div>
  );
};

export default AccommodationTypes;

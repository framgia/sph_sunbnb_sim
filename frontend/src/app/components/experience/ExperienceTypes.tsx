import React from "react";
import { ExperienceType } from "@/app/utils/enums";
import ExperienceTypeItem from "./ExperienceTypeItem";

const ExperienceTypes: React.FC = () => {
  return (
    <div className="mt-5 flex flex w-full gap-2 overflow-x-auto py-3 md:justify-center">
      <ExperienceTypeItem type={"All"} />
      {Object.values(ExperienceType).map((type, index) => (
        <ExperienceTypeItem key={index} type={type} />
      ))}
    </div>
  );
};

export default ExperienceTypes;

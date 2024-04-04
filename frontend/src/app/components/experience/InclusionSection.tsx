import React from "react";
import InclusionItem from "./InclusionItem";
import type { Inclusion } from "@/app/utils/enums";

interface InclusionSectionProps {
  inclusions: Inclusion[];
}
const InclusionSection: React.FC<InclusionSectionProps> = ({ inclusions }) => {
  return (
    <div>
      <span className="text-xl font-semibold">What this place offers</span>
      <div className="my-10 w-full">
        <div className="grid grid-cols-4 gap-x-10">
          {inclusions.map((inclusion, i) => {
            return <InclusionItem key={i} inclusion={inclusion} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default InclusionSection;

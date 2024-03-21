import React, { type ReactNode } from "react";
import DrinksIcon from "../svgs/Inclusions/DrinksIcon";
import FoodIcon from "../svgs/Inclusions/FoodIcon";
import TicketsIcon from "../svgs/Inclusions/TicketsIcon";
import TransportIcon from "../svgs/Inclusions/TransportIcon";

interface InclusionItemProp {
  inclusion: string;
}
const InclusionItem: React.FC<InclusionItemProp> = ({ inclusion }) => {
  const inclusions = [
    { name: "Drinks", icon: <DrinksIcon /> },
    { name: "Food", icon: <FoodIcon /> },
    { name: "Tickets", icon: <TicketsIcon /> },
    { name: "Transportation", icon: <TransportIcon /> }
  ];

  const inclusionObj = inclusions.find((inclsn) => {
    return inclsn.name === inclusion;
  });

  return (
    <div>
      {inclusionObj !== undefined ? (
        <div className="flex flex-row items-center">
          <div className="p-2">{inclusionObj.icon as ReactNode}</div>
          <span className="text-sm leading-5">{inclusionObj.name}</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InclusionItem;

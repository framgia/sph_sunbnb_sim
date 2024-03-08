import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const options = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "cottage", label: "Cottage" }
];

const EditSelectType: React.FC = () => {
  return (
    <div>
      <div className="ax-md:max-w-full mt-10 w-full text-left text-sm font-semibold leading-7">
        Type
      </div>
      <Select
        className="mt-8"
        label="Select accommodation type"
        variant="bordered"
        color="success"
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default EditSelectType;

import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { AccomodationType } from "@/app/utils/enums";
import type { Accommodation } from "@/app/interfaces/AccomodationData";

interface AccommodationMoreDetailsProps {
  data: Accommodation;
  setData: React.Dispatch<React.SetStateAction<Accommodation>>;
}

const SelectType: React.FC<AccommodationMoreDetailsProps> = ({
  data,
  setData
}) => {
  return (
    <div>
      <div className="mt-10 w-full text-left text-sm font-semibold leading-7 text-black max-md:max-w-full">
        Type
      </div>
      <Select
        defaultSelectedKeys={data.type !== "" ? [data.type] : []}
        className="mt-8"
        placeholder="Select accommodation type"
        variant="bordered"
        aria-label="Select Accommodation Type"
        onChange={(e) => {
          setData({ ...data, type: e.target.value });
        }}
      >
        {Object.values(AccomodationType).map((type) => (
          <SelectItem
            key={type}
            value={type}
            aria-label="Accommodation Type Item"
          >
            {type}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectType;

import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { AccommodationType } from "@/app/utils/enums";
import type { Accommodation } from "@/app/interfaces/AccomodationData";

interface AccommodationMoreDetailsProps {
  data: Accommodation;
  setData: React.Dispatch<React.SetStateAction<Accommodation>>;
  error: Record<string, string | boolean>;
}

const SelectType: React.FC<AccommodationMoreDetailsProps> = ({
  data,
  setData,
  error
}) => {
  return (
    <div>
      <div className="mt-5 w-full text-left text-sm font-semibold leading-7 text-black max-md:max-w-full">
        Type
      </div>
      <Select
        defaultSelectedKeys={data.type !== "" ? [data.type] : []}
        className="mt-4"
        label="Select accommodation type"
        variant="bordered"
        aria-label="Select Accommodation Type"
        onChange={(e) => {
          setData({ ...data, type: e.target.value });
        }}
      >
        {Object.values(AccommodationType).map((type) => (
          <SelectItem
            key={type}
            value={type}
            aria-label="Accommodation Type Item"
          >
            {type}
          </SelectItem>
        ))}
      </Select>
      {error.hasError === true && data.type.trim() === "" && (
        <div className="mt-2 text-xs text-red-500">
          Select an accommodation type
        </div>
      )}
    </div>
  );
};

export default SelectType;

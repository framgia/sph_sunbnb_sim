import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const options = [
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "villa", label: "Villa" },
    { value: "cottage", label: "Cottage" }
];

const SelectType: React.FC = () => {
    return (
        <div>
            <div className="mt-10 w-full text-left text-sm font-semibold leading-7 text-black max-md:max-w-full">
                Type
            </div>
            <Select
                className="mt-8"
                placeholder="Select accommodation type"
                variant="bordered"
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

export default SelectType;

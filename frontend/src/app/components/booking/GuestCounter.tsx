import React from "react";
import PlusIcon from "../svgs/PlusIcon";
import MinusIcon from "../svgs/MinusIcon";
import type { Accommodation } from "@/app/interfaces/AccomodationData";
import { Button } from "@nextui-org/react";

interface GuestCounterProps {
  value: number;
  updateValue: (val: number) => void;
  min: number;
  max: number;
}

const GuestCounter: React.FC<GuestCounterProps> = ({
  value,
  updateValue,
  min,
  max
}) => {
  const handleIncrement = (): void => {
    updateValue(value + 1);
  };

  const handleDecrement = (): void => {
    updateValue(value - 1);
  };

  return (
    <div className="my-1 flex w-full justify-between px-0">
      <div className="grid grid-cols-3 items-center p-2">
        <Button
          className="flex justify-center rounded-full bg-white"
          isIconOnly
          onClick={handleDecrement}
          isDisabled={value <= min}
        >
          <MinusIcon />
        </Button>

        <div className="flex justify-center">{value}</div>

        <Button
          className="flex justify-center rounded-full bg-white"
          isIconOnly
          isDisabled={value >= max}
          onClick={handleIncrement}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default GuestCounter;

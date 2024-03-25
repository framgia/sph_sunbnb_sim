import React from "react";
import PlusIcon from "../svgs/PlusIcon";
import MinusIcon from "../svgs/MinusIcon";
import { Button } from "@nextui-org/react";
import { Experience } from "@/app/interfaces/ExperienceData";

interface CounterProps {
  name: string;
  data: Experience;
  setData: React.Dispatch<React.SetStateAction<Experience>>;
  id: keyof Experience;
}

const ExperienceCounter: React.FC<CounterProps> = ({
  name,
  data,
  setData,
  id
}) => {
  const handleIncrement = (): void => {
    setData({
      ...data,
      [id]: (data[id] as number) + 1
    });
  };

  const handleDecrement = (): void => {
    if ((data[id] as number) > 0) {
      setData({
        ...data,
        [id]: (data[id] as number) - 1
      });
    }
  };

  return (
    <div className="my-1 flex w-full justify-between px-0">
      <div className="flex items-center">{name}</div>

      <div className="grid grid-cols-3 items-center p-2">
        <Button
          className="flex justify-center rounded-full bg-white"
          isIconOnly
          onClick={handleDecrement}
        >
          <MinusIcon />
        </Button>

        <div className="flex justify-center">{data[id]}</div>

        <Button
          className="flex justify-center rounded-full bg-white"
          isIconOnly
          onClick={handleIncrement}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default ExperienceCounter;

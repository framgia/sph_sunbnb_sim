import React from "react";
import PlusIcon from "../svgs/PlusIcon";
import MinusIcon from "../svgs/MinusIcon";
import type { Accommodation } from "@/app/interfaces/AccomodationData";

interface CounterProps {
  name: string;
  data: Accommodation;
  setData: React.Dispatch<React.SetStateAction<Accommodation>>;
  id: keyof Accommodation;
}

const Counter: React.FC<CounterProps> = ({ name, data, setData, id }) => {
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
    <div className="mt-5 flex w-full justify-between px-0">
      <div>{name}</div>

      <div className="flex items-center p-2">
        <div onClick={handleDecrement}>
          <MinusIcon />
        </div>

        <div className="px-5">{data[id]}</div>

        <div onClick={handleIncrement}>
          <PlusIcon />
        </div>
      </div>
    </div>
  );
};

export default Counter;

import React from "react";
import PlusIcon from "../svgs/PlusIcon";
import MinusIcon from "../svgs/MinusIcon";

interface Detail {
  id: string;
  name: string;
  count: number;
}

interface CounterProps {
  detail: Detail;
  setDetails: React.Dispatch<React.SetStateAction<Record<string, Detail>>>;
  details: Record<string, Detail>;
}

const Counter: React.FC<CounterProps> = ({ detail, setDetails, details }) => {
  const handleIncrement = (): void => {
    setDetails({
      ...details,
      [detail.id]: { ...detail, count: detail.count + 1 }
    });
  };

  const handleDecrement = (): void => {
    if (detail.count > 0) {
      setDetails({
        ...details,
        [detail.id]: { ...detail, count: detail.count - 1 }
      });
    }
  };

  return (
    <div className="mt-5 flex w-full justify-between px-0">
      <div>{detail.name}</div>

      <div className="flex items-center p-2">
        <div onClick={handleDecrement}>
          <MinusIcon />
        </div>

        <div className="px-5">{detail.count}</div>

        <div onClick={handleIncrement}>
          <PlusIcon />
        </div>
      </div>
    </div>
  );
};

export default Counter;

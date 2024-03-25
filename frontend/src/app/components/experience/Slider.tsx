"use client";
import { Slider } from "@nextui-org/react";
import React from "react";

const SliderComponent: React.FC = () => {
  return (
    <div className="mt-10 flex w-full max-w-md flex-col gap-6">
      <Slider
        size="md"
        step={1}
        maxValue={24}
        minValue={1}
        color="primary"
        showOutline={true}
        label="Hours"
        aria-label="Hours"
        defaultValue={2}
        className="max-w-md"
      />
    </div>
  );
};

export default SliderComponent;

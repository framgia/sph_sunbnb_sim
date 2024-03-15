"use client";
import type { RadioProps } from "@nextui-org/react";
import { cn, useRadio } from "@nextui-org/react";
import React from "react";

const RadioCard: React.FC<RadioProps> = (props) => {
  const {
    Component,
    children,
    description,
    getBaseProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group m-2 inline-flex flex-row-reverse items-center justify-between tap-highlight-transparent hover:opacity-70 active:opacity-50",
        "w-72 cursor-pointer gap-4 rounded-3xl border-2 border-default p-4",
        "data-[selected=true]:border-primary-600 data-[selected=true]:bg-primary-50 "
      )}
    >
      <input
        className="self-start"
        style={{
          accentColor: "#ff2200"
        }}
        {...getInputProps()}
      />
      <div {...getLabelWrapperProps()}>
        {children !== undefined ? (
          <span {...getLabelProps()} className="justify-start pb-1">
            {children}
          </span>
        ) : (
          <></>
        )}
        {description !== undefined ? (
          <span className="text-small text-foreground opacity-70">
            {description}
          </span>
        ) : (
          <></>
        )}
      </div>
    </Component>
  );
};

export default RadioCard;

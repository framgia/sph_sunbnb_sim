import { type FilterButtonProps } from "@/app/interfaces/ListingsProps";
import { Button } from "@nextui-org/react";
import React from "react";

const FilterButton: React.FC<FilterButtonProps> = ({
  isClear = false,
  isModal = false,
  ...props
}) => {
  return (
    <Button
      color={isClear ? "default" : "primary"}
      size="sm"
      className={`ms-2 ${isModal ? "" : "hidden md:flex"}`}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default FilterButton;

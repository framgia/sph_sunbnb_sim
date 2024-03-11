import React, { type SVGProps } from "react";

const ChevronLeftIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      fill="none"
      {...props}
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m15 18.5-6-6 6-6"
      />
    </svg>
  );
};

export default ChevronLeftIcon;

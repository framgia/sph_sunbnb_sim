import React, { type SVGProps } from "react";

const ChevronDownIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.589 7.744A.833.833 0 1 0 4.41 8.923l5 5a.833.833 0 0 0 1.179 0l5-5a.833.833 0 0 0-1.179-1.179L10 12.154l-4.411-4.41Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default ChevronDownIcon;

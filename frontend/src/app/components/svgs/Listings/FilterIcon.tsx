import React, { type SVGProps } from "react";

const FilterIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
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
        d="M14.067 8.333a3.962 3.962 0 0 0-3.959 3.958c0 .742.209 1.442.575 2.042a3.924 3.924 0 0 0 3.384 1.917c1.441 0 2.7-.775 3.383-1.917.367-.592.575-1.3.575-2.042a3.957 3.957 0 0 0-3.958-3.958ZM15.55 12.9h-.858v.891a.63.63 0 0 1-.625.625.63.63 0 0 1-.625-.625V12.9h-.85a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625h.85v-.817a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v.817h.858a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Z"
      />
      <path
        fill="currentColor"
        d="M17.15 3.35V5.2c0 .675-.417 1.517-.834 1.942l-.15.133a.447.447 0 0 1-.441.084 5.62 5.62 0 0 0-.5-.142 4.793 4.793 0 0 0-1.159-.133 5.21 5.21 0 0 0-5.208 5.208c0 .95.258 1.883.75 2.683.417.7 1 1.284 1.633 1.675.192.125.267.392.1.542-.058.05-.116.092-.175.133L10 18.084c-1.084.675-2.575-.084-2.575-1.434v-4.458c0-.592-.334-1.35-.667-1.767L3.6 7.06c-.417-.425-.75-1.184-.75-1.684V3.434c0-1.009.75-1.767 1.658-1.767H15.49c.909 0 1.659.758 1.659 1.683Z"
      />
    </svg>
  );
};

export default FilterIcon;
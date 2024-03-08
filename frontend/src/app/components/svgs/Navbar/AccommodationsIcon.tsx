import * as React from "react";
import { type SVGProps } from "react";

const AccommodationsIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <path
                fill="currentColor"
                d="M19.92 21.426a1.44 1.44 0 0 0 1.44-1.44V8.863a1.44 1.44 0 0 0-1.44-1.44H4.08a1.44 1.44 0 0 0-1.44 1.44v11.123c0 .796.644 1.44 1.44 1.44h15.84Zm0 .96H4.08a2.4 2.4 0 0 1-2.4-2.4V8.863a2.4 2.4 0 0 1 2.4-2.4h15.84a2.4 2.4 0 0 1 2.4 2.4v11.123a2.4 2.4 0 0 1-2.4 2.4Z"
            />
            <path
                fill="currentColor"
                d="M5.502 6.972v14.59a.48.48 0 1 0 .96 0V6.973a.48.48 0 1 0-.96 0Zm12.024.232v14.591a.48.48 0 1 0 .96 0V7.205a.48.48 0 1 0-.96 0ZM9.12 6.72V3.84c0-.795.645-1.44 1.44-1.44h3.36c.795 0 1.44.645 1.44 1.44v2.88a.48.48 0 1 0 .96 0V3.84a2.4 2.4 0 0 0-2.4-2.4h-3.36a2.4 2.4 0 0 0-2.4 2.4v2.88a.48.48 0 1 0 .96 0Z"
            />
        </svg>
    );
};

export default AccommodationsIcon;

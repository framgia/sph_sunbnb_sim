import * as React from "react";
import { type SVGProps } from "react";

const HistoryIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <g fill="currentColor" clipPath="url(#a)">
                <path d="M12 6.554a.667.667 0 0 0-.667.666v5.814l3.933 2.666A.668.668 0 0 0 16 14.587l-3.334-2.26V7.22A.667.667 0 0 0 12 6.554Z" />
                <path d="M12 1.333A10.727 10.727 0 0 0 2.666 6.84V3.466a.667.667 0 0 0-1.333 0v5.867H7.2A.667.667 0 0 0 7.2 8H3.566A9.333 9.333 0 1 1 5.72 18.9a.668.668 0 1 0-.9.986A10.668 10.668 0 1 0 12 1.333Z" />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default HistoryIcon;

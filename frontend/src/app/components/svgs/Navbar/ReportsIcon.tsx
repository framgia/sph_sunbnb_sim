import * as React from "react";
import { type SVGProps } from "react";

const ReportsIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
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
                d="M21.063 1.532h-.868a.383.383 0 1 0 0 .766h.485v20.936H3.32V2.298h1.634v.383A1.15 1.15 0 0 0 6.102 3.83 1.15 1.15 0 0 0 7.25 2.68v-.382h1.634v.383a1.15 1.15 0 0 0 1.149 1.149 1.15 1.15 0 0 0 1.149-1.15v-.382h1.634v.383a1.15 1.15 0 0 0 1.149 1.149 1.15 1.15 0 0 0 1.149-1.15v-.382h1.634v.383a1.15 1.15 0 0 0 1.149 1.149 1.15 1.15 0 0 0 1.149-1.15V1.15a1.15 1.15 0 0 0-2.298 0v.383h-1.635v-.383A1.15 1.15 0 0 0 13.965 0a1.15 1.15 0 0 0-1.148 1.149v.383h-1.635v-.383A1.15 1.15 0 0 0 10.034 0a1.15 1.15 0 0 0-1.15 1.149v.383H7.252v-.383A1.15 1.15 0 0 0 6.1 0a1.15 1.15 0 0 0-1.148 1.149v.383H2.936a.383.383 0 0 0-.383.383v21.702c0 .102.04.199.112.27.112.113.174.113.474.113h17.924a.383.383 0 0 0 .383-.383V1.915a.383.383 0 0 0-.383-.383Zm-3.549-.383a.383.383 0 0 1 .766 0v1.532a.383.383 0 0 1-.766 0V1.149Zm-3.931 0a.383.383 0 0 1 .765 0v1.532a.383.383 0 0 1-.766 0V1.149Zm-3.932 0a.383.383 0 0 1 .765 0v1.532a.383.383 0 0 1-.765 0V1.149Zm-3.932 0a.383.383 0 0 1 .766 0v1.532a.383.383 0 0 1-.766 0V1.149Z"
            />
            <path
                fill="currentColor"
                d="M17.005 14.17H6.996a.383.383 0 1 0 0 .766h10.009a.383.383 0 1 0 0-.766ZM17.005 12.128H6.996a.383.383 0 0 0 0 .766h10.009a.383.383 0 1 0 0-.766ZM17.005 10.085H6.996a.383.383 0 1 0 0 .766h10.009a.383.383 0 1 0 0-.766ZM17.005 16.213H6.996a.383.383 0 1 0 0 .766h10.009a.383.383 0 1 0 0-.766ZM13.175 18.255H6.996a.383.383 0 1 0 0 .766h6.179a.383.383 0 1 0 0-.766ZM19.532 5.106H4.467a.383.383 0 1 0 0 .766h15.065a.383.383 0 1 0 0-.766Z"
            />
        </svg>
    );
};

export default ReportsIcon;

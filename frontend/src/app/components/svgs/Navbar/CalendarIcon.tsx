import * as React from "react";
import { type SVGProps } from "react";

const CalendarIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            {...props}
        >
            <g clipPath="url(#a)">
                <path
                    fill="currentColor"
                    d="M15.423.001c.442.025.783.366.771.77v1.087c3.51.307 5.306 2.053 5.306 5.192v8.684c0 3.492-2.212 5.266-6.564 5.266H7.064C2.712 21 .5 19.226.5 15.734V7.05c0-2.09.791-3.585 2.414-4.458l.114-.058a.878.878 0 0 1 .741.03.73.73 0 0 1 .408.688.749.749 0 0 1-.491.64c-1.076.576-1.583 1.58-1.583 3.158v.279h14.801c.443 0 .802.328.802.734 0 .405-.359.733-.802.733H2.103v6.938c0 2.665 1.44 3.77 4.96 3.79h7.873c3.47 0 4.951-1.134 4.951-3.8V7.042c0-2.322-1.126-3.446-3.693-3.715v.706c-.059.376-.419.65-.834.636-.415-.014-.75-.313-.779-.692V.706l.015-.115a.72.72 0 0 1 .245-.398.847.847 0 0 1 .582-.192Zm.462 14.906.129.007c.221.025.43.117.59.262.192.175.3.412.3.66 0 .513-.454.929-1.014.929s-1.015-.416-1.015-.929c0-.513.455-.929 1.015-.929h-.005Zm-4.865 0 .128.008c.5.057.887.448.887.921 0 .513-.454.929-1.015.929-.56 0-1.014-.416-1.014-.929 0-.513.454-.929 1.014-.929Zm-4.864 0 .129.007c.222.025.43.117.59.262.192.175.3.412.3.66 0 .513-.454.929-1.014.929s-1.015-.416-1.015-.929c0-.513.455-.929 1.015-.929h-.005Zm9.729-3.761.129.007c.221.025.43.116.59.262.192.174.3.412.3.66 0 .513-.454.929-1.014.929s-1.015-.416-1.015-.93c0-.512.455-.928 1.015-.928h-.005Zm-4.865 0 .128.007c.5.057.887.448.887.922 0 .513-.454.929-1.015.929-.56 0-1.014-.416-1.014-.93 0-.512.454-.928 1.014-.928Zm-4.864 0 .129.007c.222.025.43.116.59.262.192.174.3.412.3.66 0 .513-.454.929-1.014.929s-1.015-.416-1.015-.93c0-.512.455-.928 1.015-.928h-.005ZM6.612.112c.413 0 .76.284.807.66v1.012h4.585c.443 0 .802.329.802.734 0 .405-.359.734-.802.734H7.4v.733a.704.704 0 0 1-.239.522.842.842 0 0 1-.573.212l-.117-.01c-.382-.06-.67-.368-.664-.733V.772l.022-.11c.094-.32.412-.55.784-.55Z"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M.5 0h21v21H.5z" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default CalendarIcon;

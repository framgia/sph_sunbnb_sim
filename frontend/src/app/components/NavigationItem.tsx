import React from "react";

interface NavigationItemProps {
    children: React.ReactNode;
    onClick: () => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
    children,
    onClick
}) => (
    <div
        className="cursor-pointer hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(event) => {
            if (event.key === "Enter") onClick();
        }}
        role="button"
    >
        {children}
    </div>
);

export default NavigationItem;

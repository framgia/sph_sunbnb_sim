import React from "react";

interface DividerTextProps {
    children: React.ReactNode;
}

const DividerText: React.FC<DividerTextProps> = ({ children }) => {
    return (
        <div className="my-5 flex items-center">
            <div className="border-primary w-full border" />
            <span className="w-auto whitespace-nowrap px-2 text-center text-xs text-zinc-500">
                {children}
            </span>
            <div className="border-primary w-full border" />
        </div>
    );
};

export default DividerText;

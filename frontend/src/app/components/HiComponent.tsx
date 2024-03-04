import React from "react";

interface HiProps {
    greeting: string;
}

const HiComponent: React.FC<HiProps> = (props: { greeting: string }) => {
    return (
        <div className="rounded-lg bg-primary-600 p-10">
            <p className="text-2xl font-bold text-white">{props.greeting}</p>
        </div>
    );
};

export default HiComponent;

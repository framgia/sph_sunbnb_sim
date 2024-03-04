import React from "react";

interface ButtonProps {
    label: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button
            className={"py-2 px-4 bg-red-500 mt-8 text-white rounded-md"}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Button;

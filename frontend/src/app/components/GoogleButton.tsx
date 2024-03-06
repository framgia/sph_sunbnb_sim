import { Button } from "@nextui-org/react";
import React from "react";
import GoogleIcon from "./svgs/Google";

const GoogleButton: React.FC = () => {
    return (
        <Button className="w-full" variant="bordered">
            <span className="flex flex-row justify-center font-medium">
                <span className="mx-2">
                    <GoogleIcon />
                </span>
                <span className="self-center">Google</span>
            </span>
        </Button>
    );
};

export default GoogleButton;

import { Button } from "@nextui-org/react";
import React from "react";
import GoogleIcon from "./svgs/Google";

interface GoogleButtonProps {
  onPress: () => void;
}
const GoogleButton: React.FC<GoogleButtonProps> = ({ onPress }) => {
  return (
    <Button className="w-full" variant="bordered" onPress={onPress}>
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

import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

interface ToEditButtonProps {
  path: string;
}

const ToEditButton: React.FC<ToEditButtonProps> = ({ path }) => {
  return (
    <div className="relative">
      <Link href={path}>
        <Button className="right-0 top-0 bg-primary-500 font-semibold text-white">
          Edit
        </Button>
      </Link>
    </div>
  );
};

export default ToEditButton;

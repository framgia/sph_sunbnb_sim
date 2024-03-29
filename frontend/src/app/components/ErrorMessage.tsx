import React from "react";
import WarningIcon from "./svgs/WarnIcon";

interface ErrorMessageProps {
  header?: string;
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  header = "",
  message
}) => {
  return (
    <div className="my-4 w-full rounded-xl border-2 border-danger-500 bg-danger-50 p-2 text-danger-500">
      <div className="flex flex-row">
        <div className="p-2">
          <WarningIcon />
        </div>
        <div className="flex flex-col justify-center p-2 text-xs">
          {header.trim() !== "" && <span className="font-bold">{header}</span>}
          <span className={`${header.trim() !== "" ? "" : "font-semibold"}`}>
            {message}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;

import type { ReportFilters } from "@/app/interfaces/types";
import { ReportStatus } from "@/app/utils/enums";
import React from "react";

interface ReportTabProps {
  filters: ReportFilters;
  handleStatus: (status: string) => void;
}

const ReportTabStatus: React.FC<ReportTabProps> = ({
  filters,
  handleStatus
}) => {
  return (
    <>
      <div className="mt-5 flex w-full justify-around md:m-8 md:w-32 md:flex-col md:justify-normal">
        <div
          className={`my-1 cursor-pointer px-3 ${
            filters.status === ReportStatus.OPEN
              ? "border-b-5 border-primary text-primary md:border-b-0 md:border-r-5"
              : "text-gray-500"
          }`}
          onClick={() => {
            handleStatus(ReportStatus.OPEN);
          }}
        >
          Open
        </div>
        <div
          className={`my-1 cursor-pointer px-3  ${
            filters.status === ReportStatus.CLOSED
              ? "border-b-5 border-primary text-primary md:border-b-0 md:border-r-5"
              : "text-gray-500"
          }`}
          onClick={() => {
            handleStatus(ReportStatus.CLOSED);
          }}
        >
          Closed
        </div>
      </div>
    </>
  );
};

export default ReportTabStatus;

import type { ReportFilters } from "@/app/interfaces/types";
import { ReportStatus } from "@/app/utils/enums";
import React from "react";

interface ReportTabProps {
  filters: ReportFilters;
  setFilters: React.Dispatch<React.SetStateAction<ReportFilters>>;
}

const ReportTabStatus: React.FC<ReportTabProps> = ({ filters, setFilters }) => {
  return (
    <>
      <div className="m-8 flex w-32 flex-col">
        <div
          className={`my-1 cursor-pointer px-3 ${
            filters.status === ReportStatus.OPEN
              ? "border-r-5 border-primary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => {
            setFilters({ ...filters, status: ReportStatus.OPEN });
          }}
        >
          Open
        </div>
        <div
          className={`my-1 cursor-pointer px-3  ${
            filters.status === ReportStatus.CLOSED
              ? "border-r-5 border-primary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => {
            setFilters({ ...filters, status: ReportStatus.CLOSED });
          }}
        >
          Closed
        </div>
      </div>
    </>
  );
};

export default ReportTabStatus;

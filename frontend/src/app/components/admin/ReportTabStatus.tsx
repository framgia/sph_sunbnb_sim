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
      <div className="mt-5 flex w-full justify-around md:m-8 md:w-32 md:flex-col md:justify-normal">
        <div
          className={`my-1 cursor-pointer px-3 ${
            filters.status === ReportStatus.OPEN
              ? "border-b-5 border-primary text-primary md:border-b-0 md:border-r-5"
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
              ? "border-b-5 border-primary text-primary md:border-b-0 md:border-r-5"
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

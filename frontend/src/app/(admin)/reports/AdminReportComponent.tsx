"use client";
import ReportCard from "@/app/components/admin/ReportCard";
import ReportTabStatus from "@/app/components/admin/ReportTabStatus";
import { Input, Pagination } from "@nextui-org/react";
import React from "react";

const AdminReportComponent: React.FC = () => {
  const reports = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
        <Input type="Search" label="Search" radius="full" />
      </div>
      <div className="mt-5 text-3xl font-bold">Reports</div>
      <div className="flex w-full">
        <ReportTabStatus />
        <div className="mt-5 flex w-full flex-col gap-5">
          {reports.map((report, index) => (
            <ReportCard key={index} />
          ))}
        </div>
      </div>
      <Pagination
        isCompact
        showControls
        total={2}
        initialPage={1}
        className="mt-5 flex w-full justify-center"
      />
    </>
  );
};

export default AdminReportComponent;

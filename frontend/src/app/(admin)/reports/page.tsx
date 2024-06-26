"use server";
import React from "react";
import AdminReportComponent from "./AdminReportComponent";
import { getReports } from "@/app/utils/helpers/report/request";
import type { ReportFilters } from "@/app/interfaces/types";
import { type ReportStatus } from "@/app/utils/enums";

const ReportsPage: React.FC = async ({
  searchParams
}: {
  searchParams?: {
    status?: string;
    reason?: string;
    type?: string;
    sort?: string;
    search?: string;
    page?: number;
  };
}) => {
  const filter: ReportFilters = {
    status: (searchParams?.status as ReportStatus) ?? "open",
    reason: searchParams?.reason ?? "",
    type: searchParams?.type ?? "",
    sort: searchParams?.sort ?? "asc",
    search: searchParams?.search ?? "",
    page: searchParams?.page ?? 1
  };
  const data = await getReports(filter);
  return (
    <>
      <AdminReportComponent
        reports={data.reports}
        pagination={data.pagination}
        filtersData={filter}
      />
    </>
  );
};

export default ReportsPage;

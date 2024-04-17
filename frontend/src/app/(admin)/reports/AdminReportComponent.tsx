"use client";
import ReportCard from "@/app/components/admin/ReportCard";
import ReportFilterComponent from "@/app/components/admin/ReportFilterComponent";
import ReportTabStatus from "@/app/components/admin/ReportTabStatus";
import SearchIcon from "@/app/components/svgs/SearchIcon";
import type {
  PaginationType,
  Report,
  ReportFilters
} from "@/app/interfaces/types";
import { Input, Pagination } from "@nextui-org/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AdminReportProps {
  reports: Report[];
  pagination: PaginationType;
  filtersData: ReportFilters;
}

const AdminReportComponent: React.FC<AdminReportProps> = ({
  reports,
  pagination,
  filtersData
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [actionDone, setActionDone] = useState(false);
  const [filters, setFilters] = useState<ReportFilters>(filtersData);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("status", filters.status);
    params.set("sort", filters.sort);
    params.set("page", filters.page.toString());
    if (filters.reason === "") params.delete("reason");
    else params.set("reason", filters.reason);
    if (filters.type === "") params.delete("type");
    else params.set("type", filters.type);
    if (filters.search !== "") params.set("search", filters.search);
    else params.delete("search");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filters, pathname, searchParams, router, actionDone]);

  return (
    <>
      <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
        <Input
          type="Search"
          radius="full"
          startContent={<SearchIcon />}
          placeholder="Search"
          aria-label="Search"
          value={filters.search}
          onChange={(e) => {
            setFilters({ ...filters, page: 1, search: e.target.value });
          }}
        />
      </div>
      <div className="flex justify-between">
        <div className="mt-5 text-2xl font-bold">Reports</div>
        <ReportFilterComponent filters={filters} setFilters={setFilters} />
      </div>
      <div className="flex w-full flex-col md:flex-row">
        <ReportTabStatus filters={filters} setFilters={setFilters} />
        <div className="mt-5 flex w-full flex-col gap-5">
          {reports.length > 0 ? (
            <>
              {reports.map((report, index) => (
                <ReportCard
                  key={index}
                  report={report}
                  setActionDone={setActionDone}
                />
              ))}
              <Pagination
                className="m-3 flex justify-center"
                isCompact
                showControls
                total={Math.ceil(pagination.total / pagination.per_page)}
                initialPage={1}
                page={Number(filters.page)}
                onChange={(page) => {
                  setFilters({ ...filters, page });
                }}
              />
            </>
          ) : (
            <div className="flex justify-center">No reports to display.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminReportComponent;

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
import { ListingType, Reason } from "@/app/utils/enums";
import { Input, Pagination, Spinner } from "@nextui-org/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

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
  const [isLoading, setLoading] = useState(false);
  const [reportsState, setReports] = useState(reports);
  const [actionDone, setActionDone] = useState(false);

  // status: (searchParams?.status as ReportStatus) ?? "open",
  //   reason: searchParams?.reason ?? "",
  //   type: searchParams?.type ?? "",
  //   sort: searchParams?.sort ?? "asc",
  //   search: searchParams?.search ?? "",
  //   page: searchParams?.page ?? 1

  const handleReasonChange = useCallback(
    (reason: Reason | "") => {
      const params = new URLSearchParams(searchParams);
      if (reason === "") params.delete("reason");
      else params.set("reason", reason);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router]
  );

  const handleTypeChange = useCallback(
    (type: ListingType | "") => {
      const params = new URLSearchParams(searchParams);
      if (type === "") params.delete("type");
      else params.set("type", type);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router]
  );

  const handleSortChange = useCallback(
    (order: "asc" | "desc") => {
      const params = new URLSearchParams(searchParams);
      if (order === "asc") params.delete("sort");
      else params.set("sort", order);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router]
  );

  const handleStatusChange = useCallback(
    (status: string) => {
      const params = new URLSearchParams(searchParams);
      if (status === "open") params.delete("status");
      else params.set("status", status);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router]
  );

  const handleSearch = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams);
      if (query === "") params.delete("search");
      else params.set("search", query);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router]
  );

  const handlePage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      if (page === 1) params.delete("page");
      else params.set("page", page.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router]
  );

  useEffect(() => {
    setLoading(false);
    setReports(reports);
    console.log(reports);
  }, [reports]);

  // useEffect(() => {
  //   setLoading(true);
  //   const params = new URLSearchParams(searchParams);
  //   params.set("status", filters.status);
  //   params.set("sort", filters.sort);
  //   params.set("page", filters.page.toString());
  //   if (filters.reason === "") params.delete("reason");
  //   else params.set("reason", filters.reason);
  //   if (filters.type === "") params.delete("type");
  //   else params.set("type", filters.type);
  //   if (filters.search !== "") params.set("search", filters.search);
  //   else params.delete("search");
  //   router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  //   router.refresh();
  // }, [filters, pathname, searchParams, router, actionDone]);

  return (
    <>
      <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
        <Input
          type="Search"
          radius="full"
          startContent={<SearchIcon />}
          placeholder="Search"
          aria-label="Search"
          value={filtersData.search}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-between">
        <div className="mt-5 text-2xl font-bold">Reports</div>
        <ReportFilterComponent
          filters={filtersData}
          handleReason={handleReasonChange}
          handleSort={handleSortChange}
          handleType={handleTypeChange}
        />
      </div>
      <div className="flex w-full flex-col md:flex-row">
        <ReportTabStatus
          filters={filtersData}
          handleStatus={handleStatusChange}
        />
        {!isLoading ? (
          <div className="mt-5 flex w-full flex-col gap-5">
            {reportsState?.length > 0 ? (
              <>
                {reportsState.map((report, index) => (
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
                  page={Number(filtersData.page)}
                  onChange={(page) => {
                    handlePage(page);
                  }}
                />
              </>
            ) : (
              <div className="flex justify-center">No reports to display.</div>
            )}
          </div>
        ) : (
          <div className="flex w-full items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
      </div>
    </>
  );
};

export default AdminReportComponent;

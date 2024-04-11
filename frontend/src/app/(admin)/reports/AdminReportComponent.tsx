"use client";
import ReportCard from "@/app/components/admin/ReportCard";
import ReportTabStatus from "@/app/components/admin/ReportTabStatus";
import type {
  PaginationType,
  Report,
  ReportFilters
} from "@/app/interfaces/types";
import { Reason, ReportStatus } from "@/app/utils/enums";
import { getReports } from "@/app/utils/helpers/report/request";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Pagination,
  Radio,
  RadioGroup,
  Tab,
  Tabs
} from "@nextui-org/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AdminReportProps {
  reportsData: Report[];
  paginationData: PaginationType;
}

const AdminReportComponent: React.FC<AdminReportProps> = ({
  reportsData,
  paginationData
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [reports, setReports] = useState(reportsData);
  const [pagination, setPagination] = useState(paginationData);
  const [page, setPage] = useState(1);
  const [actionDone, setActionDone] = useState(false);
  const [filters, setFilters] = useState<ReportFilters>({
    status: ReportStatus.OPEN,
    reason: "",
    type: "",
    sort: "asc"
  });

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const data = await getReports(filters);
      if (data !== undefined) {
        setPagination(data.pagination);
        setReports(data.reports);
      }
    }
    fetchData().catch((error) => {
      console.error("Failed to get bookings from listing: ", error);
    });
  }, [actionDone, filters]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("status", filters.status);
    params.set("sort", filters.sort);
    if (filters.reason === "") params.delete("reason");
    else params.set("reason", filters.reason);
    if (filters.type === "") params.delete("type");
    else params.set("type", filters.type);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filters, pathname, searchParams, router]);

  return (
    <>
      <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
        <Input type="Search" label="Search" radius="full" />
      </div>
      <div className="flex justify-between">
        <div className="mt-5 text-3xl font-bold">Reports</div>
        <div className="">
          <Dropdown closeOnSelect={false}>
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="mt-5 bg-white text-neutral-500"
              >
                Filter
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions">
              <DropdownSection title="Reason">
                <DropdownItem>
                  <RadioGroup
                    aria-label="reason"
                    color="primary"
                    value={filters.reason}
                    onValueChange={(value) => {
                      setFilters({ ...filters, reason: value });
                    }}
                  >
                    <Radio key="" value="">
                      All
                    </Radio>
                    {Object.entries(Reason).map(([key, value]) => (
                      <Radio key={key} value={key}>
                        {value}
                      </Radio>
                    ))}
                  </RadioGroup>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title={"Type"} showDivider>
                <DropdownItem>
                  <Tabs
                    fullWidth
                    aria-label="type"
                    color={"primary"}
                    selectedKey={filters.type}
                    onSelectionChange={(key) => {
                      setFilters({ ...filters, type: key as string });
                    }}
                  >
                    <Tab key="" title="All"></Tab>
                    <Tab key="accommodation" title="Accommodation"></Tab>
                    <Tab key="experience" title="Experience"></Tab>
                  </Tabs>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title="Sort Order">
                <DropdownItem>
                  <Tabs
                    fullWidth
                    aria-label="type"
                    color={"primary"}
                    selectedKey={filters.sort}
                    onSelectionChange={(key) => {
                      setFilters({ ...filters, sort: key as string });
                    }}
                  >
                    <Tab key="asc" title="Ascending"></Tab>
                    <Tab key="desc" title="Descending"></Tab>
                  </Tabs>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="flex w-full">
        <ReportTabStatus filters={filters} setFilters={setFilters} />
        <div className="mt-5 flex w-full flex-col gap-5">
          {reports.map((report, index) => (
            <ReportCard
              key={index}
              report={report}
              setActionDone={setActionDone}
            />
          ))}
        </div>
      </div>
      <Pagination
        className="m-3 flex justify-center"
        isCompact
        showControls
        total={Math.ceil(pagination.total / pagination.per_page)}
        initialPage={1}
        page={page}
        onChange={(page) => {
          setPage(page);
        }}
      />
    </>
  );
};

export default AdminReportComponent;

"use client";
import ReportCard from "@/app/components/admin/ReportCard";
import ReportTabStatus from "@/app/components/admin/ReportTabStatus";
import type {
  PaginationType,
  Report,
  ReportFilters
} from "@/app/interfaces/types";
import { Reason } from "@/app/utils/enums";
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
          label="Search"
          radius="full"
          value={filters.search}
          onChange={(e) => {
            setFilters({ ...filters, page: 1, search: e.target.value });
          }}
        />
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
                      setFilters({ ...filters, page: 1, reason: value });
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
                      setFilters({ ...filters, page: 1, type: key as string });
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

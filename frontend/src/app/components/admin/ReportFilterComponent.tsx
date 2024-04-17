import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Radio,
  RadioGroup,
  Tab,
  Tabs
} from "@nextui-org/react";
import React from "react";
import FilterIcon from "../svgs/Admin/FilterIcon";
import { Reason } from "@/app/utils/enums";
import { ReportFilters } from "@/app/interfaces/types";

interface ReportFiltersProps {
  filters: ReportFilters;
  setFilters: React.Dispatch<React.SetStateAction<ReportFilters>>;
}

const ReportFilterComponent: React.FC<ReportFiltersProps> = ({
  filters,
  setFilters
}) => {
  return (
    <>
      <div className="">
        <Dropdown closeOnSelect={false}>
          <DropdownTrigger>
            <Button
              className="mt-5 bg-white text-neutral-500"
              startContent={<FilterIcon />}
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
    </>
  );
};

export default ReportFilterComponent;

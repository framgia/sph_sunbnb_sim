import type { UserManagementFilters } from "@/app/interfaces/types";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tab,
  Tabs
} from "@nextui-org/react";
import React from "react";
import FilterIcon from "../svgs/Admin/FilterIcon";

interface AdminUserManagementFilterProps {
  filters: UserManagementFilters;
  handleRoleChange: (role: string) => void;
  handleStatusChange: (status: string) => void;
  handleSortChange: (sort: string) => void;
}

const AdminUserManagementFilter: React.FC<AdminUserManagementFilterProps> = ({
  filters,
  handleRoleChange,
  handleStatusChange,
  handleSortChange
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
            <DropdownSection title={"User Role"} showDivider>
              <DropdownItem>
                <Tabs
                  fullWidth
                  aria-label="type"
                  color={"primary"}
                  selectedKey={filters.role}
                  onSelectionChange={(key) => {
                    handleRoleChange(key as string);
                  }}
                >
                  <Tab key="" title="All"></Tab>
                  <Tab key="host" title="Host"></Tab>
                  <Tab key="guest" title="Guest"></Tab>
                  <Tab key="admin" title="Admin"></Tab>
                </Tabs>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title={"User Status"} showDivider>
              <DropdownItem>
                <Tabs
                  fullWidth
                  aria-label="type"
                  color={"primary"}
                  selectedKey={filters.status}
                  onSelectionChange={(key) => {
                    handleStatusChange(key as string);
                  }}
                >
                  <Tab key="" title="All"></Tab>
                  <Tab key="banned" title="Banned"></Tab>
                  <Tab key="active" title="Active"></Tab>
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
                    handleSortChange(key as string);
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

export default AdminUserManagementFilter;

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import React from "react";
import FilterIcon from "../svgs/Admin/FilterIcon";

interface AdminApprovalFilterProps {
  selectedOption: string;
  handleStatusType: (status: string) => void;
}

const AdminApprovalFilter: React.FC<AdminApprovalFilterProps> = ({
  selectedOption,
  handleStatusType
}) => {
  return (
    <>
      <div>
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="mt-5 bg-white text-neutral-500"
              startContent={<FilterIcon />}
            >
              Status: {selectedOption}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Status Filter">
            <DropdownItem
              onPress={() => {
                handleStatusType("Pending");
              }}
            >
              Pending
            </DropdownItem>
            <DropdownItem
              onPress={() => {
                handleStatusType("Active");
              }}
            >
              Active
            </DropdownItem>
            <DropdownItem
              onPress={() => {
                handleStatusType("Refused");
              }}
            >
              Refused
            </DropdownItem>
            <DropdownItem
              onPress={() => {
                handleStatusType("All");
              }}
            >
              All
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default AdminApprovalFilter;

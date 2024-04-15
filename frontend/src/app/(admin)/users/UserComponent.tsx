"use client";
import UserGrid from "@/app/components/admin/UserGrid";
import type {
  PaginationType,
  UserAdminResponse,
  UserDetailsType,
  UserManagementFilters
} from "@/app/interfaces/types";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Pagination,
  Tab,
  Tabs
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface UserComponentProps {
  currentuser?: UserAdminResponse;
  pagination: PaginationType;
  filtersData: UserManagementFilters;
  users: UserDetailsType[];
}

const UserComponent: React.FC<UserComponentProps> = ({
  currentuser,
  filtersData,
  users,
  pagination
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isActionDone, setIsActionDone] = useState(false);

  const [filters, setFilters] = useState<UserManagementFilters>(filtersData);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set("sort", filters.sort);
    params.set("page", filters.page.toString());
    if (filters.status === "") params.delete("status");
    else params.set("status", filters.status);
    if (filters.role === "") params.delete("role");
    else params.set("role", filters.role);

    if (filters.search !== "") params.set("search", filters.search);
    else params.delete("search");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filters, pathname, searchParams, router, isActionDone]);

  return (
    <>
      <div className=" flex w-full flex-wrap gap-4 md:flex-nowrap">
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
        <div className="mb-5 mt-5 text-3xl font-bold">Users</div>
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
              <DropdownSection title={"User Role"} showDivider>
                <DropdownItem>
                  <Tabs
                    fullWidth
                    aria-label="type"
                    color={"primary"}
                    selectedKey={filters.role}
                    onSelectionChange={(key) => {
                      setFilters({ ...filters, page: 1, role: key as string });
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
                      setFilters({
                        ...filters,
                        page: 1,
                        status: key as string
                      });
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

      {users.length > 0 ? (
        <>
          <div className="mb-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {users.map((user: UserDetailsType, index: number) => (
              <div key={index}>
                <UserGrid
                  user={user}
                  currentUser={currentuser}
                  setIsActionDone={setIsActionDone}
                />
              </div>
            ))}
          </div>

          <Pagination
            isCompact
            showControls
            total={Math.ceil(
              (pagination?.total ?? 1) / (pagination?.per_page ?? 1)
            )}
            page={Number(filters.page)}
            onChange={(page) => {
              setFilters({ ...filters, page });
            }}
            className="flex w-full justify-center"
          />
        </>
      ) : (
        <>
          <span className="flex w-full justify-center p-10 text-foreground-500">
            No users to display
          </span>
        </>
      )}
    </>
  );
};

export default UserComponent;

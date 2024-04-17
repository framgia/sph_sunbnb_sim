"use client";
import AdminUserManagementFilter from "@/app/components/admin/AdminUserManagementFilter";
import UserGrid from "@/app/components/admin/UserGrid";
import SearchIcon from "@/app/components/svgs/SearchIcon";
import type {
  PaginationType,
  UserAdminResponse,
  UserDetailsType,
  UserManagementFilters
} from "@/app/interfaces/types";
import { Input, Pagination } from "@nextui-org/react";
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
    router.refresh();
  }, [filters, pathname, searchParams, router, isActionDone]);

  return (
    <>
      <div className=" flex w-full flex-wrap gap-4 md:flex-nowrap">
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
        <div className="mb-5 mt-5 text-2xl font-bold">Users</div>
        <AdminUserManagementFilter filters={filters} setFilters={setFilters} />
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

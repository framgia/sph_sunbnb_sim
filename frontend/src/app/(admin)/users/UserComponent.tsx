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
import { Input, Pagination, Spinner } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

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
  const [usersState, setUsers] = useState(users);
  const [isLoading, setLoading] = useState(false);
  const [isActionDone, setIsActionDone] = useState(false);

  useEffect(() => {
    setLoading(false);
    setUsers(users);
  }, [users]);
  useEffect(() => {
    router.refresh();
  }, [isActionDone, router]);

  //   const params = new URLSearchParams(searchParams);
  //   params.set("sort", filters.sort);
  //   params.set("page", filters.page.toString());
  //   if (filters.status === "") params.delete("status");
  //   else params.set("status", filters.status);
  //   if (filters.role === "") params.delete("role");
  //   else params.set("role", filters.role);

  //   if (filters.search !== "") params.set("search", filters.search);
  //   else params.delete("search");
  //   router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  //   router.refresh();
  // }, [filters, pathname, searchParams, router, isActionDone]);

  const handleRoleChange = useCallback(
    (role: string) => {
      const params = new URLSearchParams(searchParams);
      if (role === "") params.delete("role");
      else params.set("role", role);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router]
  );

  const handleSortChange = useCallback(
    (order: string) => {
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
      if (status === "") params.delete("status");
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

  return (
    <>
      <div className=" flex w-full flex-wrap gap-4 md:flex-nowrap">
        <Input
          type="Search"
          radius="full"
          startContent={<SearchIcon />}
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-between">
        <div className="mb-5 mt-5 text-2xl font-bold">Users</div>
        <AdminUserManagementFilter
          filters={filtersData}
          handleRoleChange={handleRoleChange}
          handleSortChange={handleSortChange}
          handleStatusChange={handleStatusChange}
        />
      </div>
      {!isLoading ? (
        <>
          {usersState?.length > 0 ? (
            <>
              <div className="mb-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
                {usersState.map((user: UserDetailsType, index: number) => (
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
                page={Number(filtersData.page)}
                onChange={(page) => {
                  handlePage(page);
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
      ) : (
        <div className="flex w-full items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
    </>
  );
};

export default UserComponent;

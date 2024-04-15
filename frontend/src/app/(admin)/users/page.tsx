import React from "react";
import UserComponent from "./UserComponent";
import {
  getAdminById,
  getAllUsers,
  getUserDetailsAdmin
} from "@/app/utils/helpers/admin/request";
import type {
  UserAdminResponse,
  UserManagementFilters
} from "@/app/interfaces/types";
import { ReportStatus } from "@/app/utils/enums";

const UsersPage: React.FC = async ({
  searchParams
}: {
  searchParams?: {
    userid?: number;
    currentuserrole?: string;
    status?: string;
    role?: string;
    sort?: string;
    search?: string;
    page?: number;
  };
}) => {
  const filter: UserManagementFilters = {
    status: searchParams?.status ?? "",
    role: searchParams?.role ?? "",
    sort: searchParams?.sort ?? "asc",
    search: searchParams?.search ?? "",
    page: searchParams?.page ?? 1
  };
  const { user, paginate } = await getAllUsers(filter);
  let userdata: UserAdminResponse | undefined;
  if (searchParams?.userid !== undefined) {
    if (searchParams?.currentuserrole === "admin") {
      userdata = await getAdminById(searchParams?.userid);
    } else {
      userdata = await getUserDetailsAdmin(searchParams?.userid);
    }
  }

  return (
    <>
      <UserComponent
        currentuser={userdata}
        users={user}
        pagination={paginate}
        filtersData={filter}
      />
    </>
  );
};

export default UsersPage;

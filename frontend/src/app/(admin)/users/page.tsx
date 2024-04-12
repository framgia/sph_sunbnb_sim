import React from "react";
import UserComponent from "./UserComponent";
import {
  getAdminById,
  getUserDetailsAdmin
} from "@/app/utils/helpers/admin/request";
import { UserAdminResponse } from "@/app/interfaces/types";

const UsersPage: React.FC = async ({
  searchParams
}: {
  searchParams?: {
    userid?: number;
    query?: string;
    role?: string;
  };
}) => {
  let userdata: UserAdminResponse | undefined = undefined;
  if (searchParams?.userid !== undefined) {
    if (searchParams?.role === "admin") {
      userdata = await getAdminById(searchParams?.userid);
    } else {
      userdata = await getUserDetailsAdmin(searchParams?.userid);
    }
  }

  return (
    <>
      <UserComponent currentuser={userdata} />
    </>
  );
};

export default UsersPage;

"use client";

import UserGrid from "@/app/components/admin/UserGrid";
import { Input, Pagination } from "@nextui-org/react";
import React from "react";

const UserComponent: React.FC = () => {
  const dummydata = [
    {
      title: "User 1",
      email: "User@email.com",
      role: "Guest",
      status: "Unbanned"
    },
    {
      title: "User 2",
      email: "User@email.com",
      role: "Host",
      status: "Banned"
    },
    {
      title: "User 3",
      email: "User@email.com",
      role: "Admin",
      status: "Unbanned"
    },
    {
      title: "User 4",
      email: "User@email.com",
      role: "Guest",
      status: "Banned"
    },
    {
      title: "User 5",
      email: "User@email.com",
      role: "Guest",
      status: "Unbanned"
    },
    {
      title: "User 6",
      email: "User@email.com",
      role: "Guest",
      status: "Unbanned"
    },
    {
      title: "User 7",
      email: "User@email.com",
      role: "Guest",
      status: "Unbanned"
    },
    {
      title: "User 8",
      email: "User@email.com",
      role: "Guest",
      status: "Unbanned"
    },
    {
      title: "User 9",
      email: "User@email.com",
      role: "Guest",
      status: "Unbanned"
    }
  ];
  return (
    <>
      <div className=" flex w-full flex-wrap gap-4 md:flex-nowrap">
        <Input type="Search" label="Search" radius="full" />
      </div>
      <div className="mb-5 mt-5 text-3xl font-bold">Users</div>
      <div className="mb-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
        {dummydata.map((item) => (
          <div key={item.title}>
            <UserGrid
              title={item.title}
              email={item.email}
              role={item.role}
              status={item.status}
            />
          </div>
        ))}
      </div>
      <Pagination
        isCompact
        showControls
        total={10}
        initialPage={1}
        className="flex w-full justify-center"
      />
    </>
  );
};

export default UserComponent;

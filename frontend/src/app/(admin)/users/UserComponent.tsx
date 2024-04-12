"use client";
import UserGrid from "@/app/components/admin/UserGrid";
import {
  PaginationType,
  UserAdminResponse,
  UserDetailsType
} from "@/app/interfaces/types";
import { Reason } from "@/app/utils/enums";
import { getAllUsers } from "@/app/utils/helpers/admin/request";
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
  Spinner,
  Tab,
  Tabs
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface UserComponentProps {
  currentuser?: UserAdminResponse;
}

const UserComponent: React.FC<UserComponentProps> = ({ currentuser }) => {
  const [userData, setUserData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [paginate, setPaginateState] = useState<PaginationType>();
  const [isloading, setIsLoading] = useState(false);
  const [isActionDone, setIsActionDone] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [page, isActionDone]);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);

      const { user, paginate } = await getAllUsers(page);
      setIsLoading(false);
      setPaginateState(paginate);
      setUserData(user);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
      <div className=" flex w-full flex-wrap gap-4 md:flex-nowrap">
        <Input type="Search" label="Search" radius="full" />
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
                  <Tabs fullWidth aria-label="type" color={"primary"}>
                    <Tab key="" title="All"></Tab>
                    <Tab key="host" title="Host"></Tab>
                    <Tab key="guest" title="Guest"></Tab>
                    <Tab key="admin" title="Admin"></Tab>
                  </Tabs>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title={"User Status"} showDivider>
                <DropdownItem>
                  <Tabs fullWidth aria-label="type" color={"primary"}>
                    <Tab key="" title="All"></Tab>
                    <Tab key="banned" title="Banned"></Tab>
                    <Tab key="active" title="Active"></Tab>
                  </Tabs>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title="Sort Order">
                <DropdownItem>
                  <Tabs fullWidth aria-label="type" color={"primary"}>
                    <Tab key="asc" title="Ascending"></Tab>
                    <Tab key="desc" title="Descending"></Tab>
                  </Tabs>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {isloading ? (
        <div className="mb-10 flex w-full justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="mb-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
          {userData &&
            userData.map((user: UserDetailsType, index: number) => (
              <div key={index}>
                <UserGrid
                  user={user}
                  currentUser={currentuser}
                  setIsActionDone={setIsActionDone}
                />
              </div>
            ))}
        </div>
      )}

      <Pagination
        isCompact
        showControls
        total={Math.ceil((paginate?.total ?? 1) / (paginate?.per_page ?? 1))}
        page={1}
        onChange={(page) => {
          setPage(page);
        }}
        className="flex w-full justify-center"
      />
    </>
  );
};

export default UserComponent;

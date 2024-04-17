"use client";
import { Avatar, Card, useDisclosure, Chip } from "@nextui-org/react";
import React from "react";
import { getInitials } from "@/app/utils/helpers/getInitials";
import UserHostCard from "./UserHostCard";
import type {
  UserAdminResponse,
  UserDetailsType
} from "@/app/interfaces/types";
import UserGuestCard from "./UserGuestCard";
import UserAdminCard from "./UserAdminCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UserGridProps {
  user: UserDetailsType;
  currentUser?: UserAdminResponse;
  setIsActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserGrid: React.FC<UserGridProps> = ({
  user,
  currentUser,
  setIsActionDone
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <div className="flex w-full justify-center">
      <Card
        shadow="md"
        isPressable
        onPress={() => {
          const params = new URLSearchParams(searchParams);
          params.set("userid", user.id.toString());
          params.set("currentuserrole", user.role);
          router.replace(`${pathname}?${params.toString()}`, { scroll: false });
          onOpen();
        }}
        radius="lg"
        className="flex h-48 w-60 justify-center rounded-3xl"
      >
        <div className="flex w-full flex-col justify-center">
          <div className="m-2 flex justify-center">
            <Avatar
              name={getInitials(user.first_name + " " + user.last_name)}
              className=" bg-danger text-white md:h-12 md:w-12"
            />
          </div>
          <div className="m-0 justify-center p-0">
            <div className="m-0 line-clamp-1 p-0 font-bold md:text-xl">
              {user.first_name} {user.last_name}
            </div>
          </div>

          <div className="m-0 justify-center truncate  px-2">
            <span className="m-0  px-2 text-xs font-light italic md:text-sm">
              {user.email}
            </span>
          </div>

          <div className="m-0 justify-center p-0 font-light">
            <span className="m-0 p-0 text-xs capitalize md:text-sm">
              {user.role}
            </span>
          </div>
        </div>
        {user.status === "banned" && (
          <div className="order-first m-0 flex w-full justify-center p-1 md:order-last md:p-2 ">
            <Chip className="bg-warning-300 text-warning-600" size="sm">
              Banned
            </Chip>
          </div>
        )}
      </Card>
      {user.role === "host" && (
        <UserHostCard
          isOpen={isOpen}
          onClose={onClose}
          size="3xl"
          user={currentUser}
          setIsActionDone={setIsActionDone}
        />
      )}
      {user.role === "guest" && (
        <UserGuestCard
          isOpen={isOpen}
          onClose={onClose}
          size="3xl"
          user={currentUser}
          setIsActionDone={setIsActionDone}
        />
      )}
      {user.role === "admin" && (
        <UserAdminCard
          isOpen={isOpen}
          onClose={onClose}
          size="3xl"
          user={currentUser}
        />
      )}
    </div>
  );
};

export default UserGrid;

"use client";
import {
  Avatar,
  Card,
  CardFooter,
  useDisclosure,
  Chip
} from "@nextui-org/react";
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
        <CardFooter className="mt-5 justify-center">
          <Avatar
            name={getInitials(user.first_name + " " + user.last_name)}
            className="h-12 w-12 bg-danger text-white"
          />
        </CardFooter>
        <CardFooter className="m-0 justify-center p-0 text-xl font-bold">
          <span className="m-0 p-0">{user.first_name}</span>
          <span className="m-0 ml-1 p-0">{user.last_name}</span>
        </CardFooter>

        <CardFooter className="m-0 justify-center p-0 text-small font-light">
          <span className="m-0 p-0 italic">{user.email}</span>
        </CardFooter>

        <CardFooter className="m-0 justify-center p-0 font-light">
          <span className="m-0 p-0 capitalize">{user.role}</span>
        </CardFooter>
        {user.status === "banned" && (
          <CardFooter className="m-0 justify-center p-5">
            <Chip className="bg-warning-300 text-warning-600">Banned</Chip>
          </CardFooter>
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

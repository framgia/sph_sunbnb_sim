"use client";
import {
  Avatar,
  Card,
  CardFooter,
  useDisclosure,
  Chip
} from "@nextui-org/react";
import React from "react";
import UserCard from "./UserCard";

interface UserGridProps {
  title: string;
  email: string;
  role: string;
  status: string; // Add status property
}

const UserGrid: React.FC<UserGridProps> = ({ title, email, role, status }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="flex w-full justify-center">
      <Card
        shadow="md"
        isPressable
        onPress={onOpen}
        radius="lg"
        className="flex h-48 w-60 justify-center rounded-3xl"
      >
        <CardFooter className="mt-5 justify-center">
          {" "}
          <Avatar></Avatar>
        </CardFooter>
        <CardFooter className="m-0 justify-center p-0 text-xl font-bold ">
          <span className="m-0 p-0">{title}</span>
        </CardFooter>
        <CardFooter className="m-0 justify-center p-0 text-small font-light">
          <span className="m-0 p-0">{email}</span>
        </CardFooter>
        <CardFooter className="m-0 justify-center p-0 font-light">
          <span className="m-0 p-0">{role}</span>
        </CardFooter>
        {status === "Banned" && (
          <CardFooter className="m-0 justify-center p-0">
            <Chip className="bg-warning-300 text-warning-600">Banned</Chip>
          </CardFooter>
        )}
      </Card>
      <UserCard isOpen={isOpen} onClose={onClose} size="3xl" />
    </div>
  );
};

export default UserGrid;

"use client";
import React from "react";
import SignUpForm from "./SignUpForm";
import { useDisclosure } from "@nextui-org/react";
import RoleSelectModal from "@/app/components/RoleSelectModal";

const SignUpComponent: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SignUpForm googleButton={onOpen} />
      <RoleSelectModal isOpen={isOpen} onClose={onClose} size="md" />
    </>
  );
};

export default SignUpComponent;

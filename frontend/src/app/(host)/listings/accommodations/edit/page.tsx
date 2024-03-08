"use client";
import DeleteModal from "@/app/components/DeleteModal";
import EditListingForm from "@/app/components/EditListingForm";
import { useDisclosure } from "@nextui-org/react";
import React from "react";

const EditListingPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <EditListingForm onPress={onOpen} />
      <DeleteModal isOpen={isOpen} onClose={onClose} size={"full"} />
    </main>
  );
};

export default EditListingPage;

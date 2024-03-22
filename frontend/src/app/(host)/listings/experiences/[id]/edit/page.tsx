"use client";
import React, { useState } from "react";
import EditExperienceForm from "./EditExperienceForm";
import { useDisclosure } from "@nextui-org/react";
import DeleteModal from "@/app/components/DeleteModal";

const EditExperiencePage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  function handleClick(): void {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }
  async function handleDelete(): Promise<void> {
    console.log("Delete");
  }
  return (
    <main className="min-w-1/2 flex min-h-screen flex-col items-center justify-between">
      <EditExperienceForm
        onDelete={onOpen}
        onClick={handleClick}
        loading={isLoading}
      />
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
        onDelete={handleDelete}
      />
    </main>
  );
};

export default EditExperiencePage;

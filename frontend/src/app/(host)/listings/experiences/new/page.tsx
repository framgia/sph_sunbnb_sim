"use client";
import React, { useState } from "react";
import NewExperienceForm from "./NewExperienceForm";
import ExperienceApprovalModal from "@/app/components/experiences/ExperienceApprovalModal";
import { useDisclosure } from "@nextui-org/react";

const NewExperiencePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  async function handleClick(): Promise<void> {
    onOpen();
  }

  return (
    <main className="min-w-1/2 flex min-h-screen flex-col items-center justify-between">
      <NewExperienceForm onPress={handleClick} />
      <ExperienceApprovalModal
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
      />
    </main>
  );
};

export default NewExperiencePage;

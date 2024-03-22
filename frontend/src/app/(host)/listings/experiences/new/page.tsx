"use client";
import React, { useState } from "react";
import NewExperienceForm from "./NewExperienceForm";
import ExperienceApprovalModal from "@/app/components/experiences/ExperienceApprovalModal";
import { useDisclosure } from "@nextui-org/react";
import { Experience } from "@/app/interfaces/ExperienceData";
import { validateExperience } from "@/app/utils/helpers/experience/validation";
import { createExperience } from "@/app/utils/helpers/experience/request";

const NewExperiencePage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");

  const [error, setError] = useState<Record<string, string | boolean>>({
    hasError: false,
    message: ""
  });

  const [media, setMedia] = useState<string[]>([]);

  const [data, setData] = useState<Experience>({
    name: "",
    description: "",
    province: "",
    city: "",
    barangay: "",
    street: "",
    zip_code: 0,
    price: 0,
    maximum_guests: 0,
    type: "",
    minimum_days: 0,
    maximum_days: 0,
    inclusions: []
  });

  async function handleClick(): Promise<void> {
    const validateData = await validateExperience(data, media);
    if (validateData.hasError as boolean) {
      setError({
        message: validateData.message,
        hasError: validateData.hasError
      });
    } else {
      setIsLoading(true);
      const result = await createExperience(data, media);
      setIsLoading(false);
      if (result.hasError === true) {
        setError({
          message: result.message,
          hasError: result.hasError
        });
      } else {
        setId(result.id as string);
        onOpen();
      }
    }
  }

  return (
    <main className="min-w-1/2 flex min-h-screen flex-col items-center justify-between">
      <NewExperienceForm
        onPress={handleClick}
        error={error}
        data={data}
        loading={isLoading}
        setData={setData}
      />
      <ExperienceApprovalModal
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
      />
    </main>
  );
};

export default NewExperiencePage;

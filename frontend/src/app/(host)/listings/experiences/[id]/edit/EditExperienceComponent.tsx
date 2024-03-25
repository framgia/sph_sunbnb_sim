"use client";
import DeleteModal from "@/app/components/DeleteModal";
import type { MediaUpdate } from "@/app/interfaces/AccomodationData";

import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Experience } from "@/app/interfaces/ExperienceData";
import { ExperienceListing } from "@/app/interfaces/types";
import { validateExperience } from "@/app/utils/helpers/experience/validation";
import {
  deleteExperience,
  updateExperience
} from "@/app/utils/helpers/experience/request";
import EditExperienceForm from "./EditExperienceForm";

interface EditListingComponentProps {
  listing: ExperienceListing;
}

const EditExperienceComponent: React.FC<EditListingComponentProps> = ({
  listing
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState<Record<string, string | boolean>>({
    hasError: false,
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Experience>({
    name: listing.name,
    description: listing.description,
    province: listing.province,
    city: listing.city,
    barangay: listing.barangay,
    street: listing.street,
    zip_code: listing.zip_code,
    price: listing.price,
    maximum_guests: listing.maximum_guests,
    type: listing.listable.type,
    start_time: listing.listable.start_time,
    end_time: listing.listable.end_time,
    language: listing.listable.language,
    inclusions: listing.listable.inclusions
  });

  const [media, setMedia] = useState<MediaUpdate>({
    delete: [],
    new: [],
    prev: listing.media.map((item) => ({
      id: item.id,
      url: item.media
    }))
  });

  async function handleClick(): Promise<void> {
    const validateData = await validateExperience(data, media, true);
    if (validateData.hasError as boolean) {
      setError({
        message: validateData.message,
        hasError: validateData.hasError
      });
    } else {
      setIsLoading(true);
      const result = await updateExperience(listing.id, data, media);
      setIsLoading(false);
      if (result.hasError === false) {
        router.push(`/listings/experiences/${listing.id}`);
      }
      if (result.hasError === true) {
        setError({
          message: result.message,
          hasError: result.hasError
        });
      }
    }
  }

  async function handleDelete(): Promise<void> {
    try {
      await deleteExperience(Number(listing.id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <EditExperienceForm
        listingid={listing.id.toString()}
        onDelete={onOpen}
        data={data}
        setData={setData}
        media={media}
        setMedia={setMedia}
        error={error}
        loading={isLoading}
        onPress={handleClick}
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

export default EditExperienceComponent;

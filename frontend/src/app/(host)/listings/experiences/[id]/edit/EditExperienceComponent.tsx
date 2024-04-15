"use client";
import DeleteModal from "@/app/components/DeleteModal";
import type { MediaUpdate } from "@/app/interfaces/AccomodationData";

import { useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import type { ExperienceData } from "@/app/interfaces/ExperienceData";
import type { ExperienceListing } from "@/app/interfaces/types";
import { validateExperience } from "@/app/utils/helpers/experience/validation";
import {
  deleteExperience,
  updateExperience
} from "@/app/utils/helpers/experience/request";
import EditExperienceForm from "./EditExperienceForm";
import ApprovalModal from "@/app/components/ApprovalModal";

interface EditListingComponentProps {
  listing: ExperienceListing;
}

const EditExperienceComponent: React.FC<EditListingComponentProps> = ({
  listing
}) => {
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose
  } = useDisclosure();
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose
  } = useDisclosure();
  const [error, setError] = useState<Record<string, string | boolean>>({
    hasError: false,
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ExperienceData>({
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
        editOnOpen();
      }
      if (result.hasError === true) {
        setError({
          message: result.message,
          hasError: result.hasError
        });
      }
    }
  }

  async function handleDelete(): Promise<boolean> {
    try {
      setIsLoading(true);
      const result = await deleteExperience(Number(listing.id));
      setIsLoading(false);
      if (result.hasError === false) return true;
      else return false;
    } catch (error) {
      console.error("Error occurred during accommodation deletion:", error);
      setIsLoading(false);
      return false;
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <EditExperienceForm
        listingid={listing.id.toString()}
        onDelete={deleteOnOpen}
        data={data}
        setData={setData}
        media={media}
        setMedia={setMedia}
        error={error}
        loading={isLoading}
        onPress={handleClick}
      />
      <DeleteModal
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
        size={"full"}
        onDelete={handleDelete}
      />
      <ApprovalModal
        isOpen={editIsOpen}
        onClose={editOnClose}
        size={"full"}
        id={listing.id.toString()}
        type="experience"
      />
    </main>
  );
};

export default EditExperienceComponent;

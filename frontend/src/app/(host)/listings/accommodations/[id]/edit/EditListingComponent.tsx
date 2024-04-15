"use client";
import DeleteModal from "@/app/components/DeleteModal";
import EditListingForm from "@/app/(host)/listings/accommodations/[id]/edit/EditListingForm";
import type {
  MediaUpdate,
  Accommodation
} from "@/app/interfaces/AccomodationData";
import { type AccommodationListing } from "@/app/interfaces/types";
import {
  deleteAccommodation,
  updateAccommodation
} from "@/app/utils/helpers/accommodation/request";
import { useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import { validateAccommodation } from "@/app/utils/helpers/accommodation/validation";
import ApprovalModal from "@/app/components/ApprovalModal";

interface EditListingComponentProps {
  listing: AccommodationListing;
}

const EditListingComponent: React.FC<EditListingComponentProps> = ({
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
  const [data, setData] = useState<Accommodation>({
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
    bed_count: listing.listable.bed_count,
    bedroom_count: listing.listable.bedroom_count,
    bathroom_count: listing.listable.bathroom_count,
    minimum_days: listing.listable.minimum_days,
    maximum_days: listing.listable.maximum_days,
    amenities: listing.listable.amenities
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
    const validateData = await validateAccommodation(data, media, true);
    if (validateData.hasError as boolean) {
      setError({
        message: validateData.message,
        hasError: validateData.hasError
      });
    } else {
      setIsLoading(true);
      const result = await updateAccommodation(listing.id, data, media);
      setIsLoading(false);
      console.log(result.hasError);
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
      const result = await deleteAccommodation(Number(listing.id));
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
      <EditListingForm
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
        type="accommodation"
      />
    </main>
  );
};

export default EditListingComponent;

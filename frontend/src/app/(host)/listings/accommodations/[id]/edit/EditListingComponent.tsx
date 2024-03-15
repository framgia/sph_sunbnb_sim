"use client";
import DeleteModal from "@/app/components/DeleteModal";
import EditListingForm from "@/app/(host)/listings/accommodations/[id]/edit/EditListingForm";
import type {
  MediaUpdate,
  Accommodation
} from "@/app/interfaces/AccomodationData";
import { type Listing } from "@/app/interfaces/types";
import { updateAccommodation } from "@/app/utils/helpers/accommodation/request";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { validateAccommodation } from "@/app/utils/helpers/accommodation/validation";

interface EditListingComponentProps {
  listing: Listing;
}

const EditListingComponent: React.FC<EditListingComponentProps> = ({
  listing
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      if (result.hasError === false) {
        router.push("/listings");
      }
      if (result.hasError === true) {
        setError({
          message: result.message,
          hasError: result.hasError
        });
      }
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <EditListingForm
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
      <DeleteModal isOpen={isOpen} onClose={onClose} size={"full"} />
    </main>
  );
};

export default EditListingComponent;

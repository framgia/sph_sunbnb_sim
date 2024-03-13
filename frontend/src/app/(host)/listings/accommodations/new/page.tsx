"use client";
import ApprovalModal from "@/app/components/ApprovalModal";
import NewListingForm from "@/app/components/accommodation/NewListingForm";
import type { Accommodation } from "@/app/interfaces/AccomodationData";
import { createAccommodation } from "@/app/utils/helpers/listingHelper";
import { useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";

const NewListingPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState<Record<string, string | boolean>>({
    hasError: false,
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Accommodation>({
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
    bed_count: 0,
    bedroom_count: 0,
    bathroom_count: 0,
    minimum_days: 0,
    maximum_days: 0,
    amenities: []
  });
  const [media, setMedia] = useState<string[]>([]);

  async function handleClick(): Promise<void> {
    setIsLoading(true);
    const result = await createAccommodation(data, media);
    setIsLoading(false);
    if (result.hasError === true) {
      setError({
        message: result.message,
        hasError: result.hasError
      });
    } else {
      onOpen();
    }
    console.log(error.hasError);
    console.log(error.message);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NewListingForm
        onPress={handleClick}
        data={data}
        setData={setData}
        media={media}
        setMedia={setMedia}
        loading={isLoading}
      />
      <ApprovalModal isOpen={isOpen} onClose={onClose} size={"full"} />
    </main>
  );
};

export default NewListingPage;

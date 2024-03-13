"use client";
import ApprovalModal from "@/app/components/ApprovalModal";
import NewListingForm from "@/app/components/accommodation/NewListingForm";
import type { Accommodation } from "@/app/interfaces/AccomodationData";
import { useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";

const NewListingPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NewListingForm onPress={onOpen} data={data} setData={setData} />
      <ApprovalModal isOpen={isOpen} onClose={onClose} size={"full"} />
    </main>
  );
};

export default NewListingPage;

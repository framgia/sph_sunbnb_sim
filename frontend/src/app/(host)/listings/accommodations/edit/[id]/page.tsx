"use client";
import DeleteModal from "@/app/components/DeleteModal";
import EditListingForm from "@/app/components/EditListingForm";
import { useDisclosure } from "@nextui-org/react";
import React from "react";

interface EditListingPageProps {
  params: {
    id: string;
  };
}

const EditListingPage: React.FC<EditListingPageProps> = ({ params }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <EditListingForm listingid={params.id} onDelete={onOpen} />
      <DeleteModal isOpen={isOpen} onClose={onClose} size={"full"} />
    </main>
  );
};

export default EditListingPage;

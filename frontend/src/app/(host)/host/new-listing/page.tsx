"use client";
import ApprovalModal from "@/app/components/ApprovalModal";
import NewListingForm from "@/app/components/NewListingForm";
import { useDisclosure } from "@nextui-org/react";
import React from "react";

const NewListingPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <NewListingForm onPress={onOpen} />
            <ApprovalModal isOpen={isOpen} onClose={onClose} />
        </main>
    );
};

export default NewListingPage;

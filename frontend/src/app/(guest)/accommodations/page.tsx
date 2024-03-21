import GuestListingHeader from "@/app/components/listings/GuestListingHeader";
import GuestListings from "@/app/components/listings/GuestListings";
import ReviewModal from "@/app/components/review/AddReviewModal";
import { Button, useDisclosure } from "@nextui-org/react";
import React from "react";

const AccommodationsPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <main className="flex flex-col">
      <GuestListingHeader type="accommodations" />
      <GuestListings />
      <Button onClick={onOpen}>Add Review</Button>
      <ReviewModal listingId={2} isOpen={isOpen} onClose={onClose} size="md" />
    </main>
  );
};

export default AccommodationsPage;

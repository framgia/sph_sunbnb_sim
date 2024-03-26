import type { ModalProps } from "@/app/interfaces/ModalProps";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import React from "react";
import ChevronLeftIcon from "../svgs/Calendar/ChevronLeftIcon";
import AccommodationReviewForm from "./AccommodationReviewForm";
import ExperienceReviewForm from "./ExperienceReviewForm";
import ReviewSuccessModal from "./ReviewSuccessModal";

interface ReviewModalProps extends ModalProps {
  listingId: number;
  listingType: "accommodation" | "experience";
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  size,
  listingId,
  listingType
}) => {
  const {
    isOpen: successOpen,
    onOpen: successOnOpen,
    onClose: successOnClose
  } = useDisclosure();

  return (
    <div>
      <Modal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        closeButton={<></>}
      >
        <ModalContent>
          {(onClose) => (
            <div className="p-5">
              <div className="mb-2 flex flex-col">
                <div className="flex flex-row">
                  <Button className="m-0 bg-white" isIconOnly onPress={onClose}>
                    <ChevronLeftIcon />
                  </Button>
                  <div className="flex flex-col">
                    <span className="my-1 items-center text-2xl font-bold">
                      Rate your stay!
                    </span>
                    <span className="text-md ">
                      Please, help us improve our service!
                    </span>
                    <span className="text-md mb-1 ">
                      We&apos;ll be happy to know your opinion!
                    </span>
                  </div>
                </div>
              </div>
              {listingType === "accommodation" ? (
                <AccommodationReviewForm
                  listingId={listingId}
                  onClose={onClose}
                  onOpen={successOnOpen}
                />
              ) : (
                <ExperienceReviewForm
                  listingId={listingId}
                  onClose={onClose}
                  onOpen={successOnOpen}
                />
              )}
            </div>
          )}
        </ModalContent>
      </Modal>
      <ReviewSuccessModal
        isOpen={successOpen}
        onClose={successOnClose}
        size="md"
        id={listingId}
        type={listingType}
      />
    </div>
  );
};

export default ReviewModal;

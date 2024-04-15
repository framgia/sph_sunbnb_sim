import React from "react";
import { Modal, ModalContent, Button } from "@nextui-org/react";
import type { ModalProps } from "@/app/interfaces/ModalProps";
import { useRouter } from "next/navigation";

interface ReviewSuccessModalProps extends ModalProps {
  id: number;
  type: "accommodation" | "experience";
}

const ReviewSuccessModal: React.FC<ReviewSuccessModalProps> = ({
  isOpen,
  onClose,
  size,
  id,
  type
}) => {
  const router = useRouter();
  function handleClick(): void {
    if (type === "accommodation") router.push(`/accommodations/${id}`);
    else if (type === "experience") router.push(`/experiences/${id}`);
    onClose();
  }
  return (
    <div>
      <Modal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <div className="p-10">
              <p className="my-5 w-full text-center text-xl font-bold">
                Thank you for your feedback!
              </p>
              <div className="my-5 flex w-full justify-center">
                <Button
                  className="bg-primary-600 text-white"
                  onPress={handleClick}
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ReviewSuccessModal;

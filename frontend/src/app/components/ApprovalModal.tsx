import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@nextui-org/react";
import WatchIcon from "./svgs/WatchIcon";
import type { ModalProps } from "../interfaces/ModalProps";
import { useRouter } from "next/navigation";

interface ApprovalModalProps extends ModalProps {
  id: string;
  type: "accommodation" | "experience";
}

const ApprovalModal: React.FC<ApprovalModalProps> = ({
  isOpen,
  onClose,
  id,
  type
}) => {
  const router = useRouter();

  function handleClick(): void {
    if (type === "experience") router.push(`/listings/experiences/${id}`);
    else router.push(`/listings/accommodations/${id}`);
    onClose();
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="mt-7 flex h-12 w-full justify-center">
                  <WatchIcon />
                </div>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  Waiting for Approval
                </ModalHeader>
                <p className="mb-5 mt-1 text-center">
                  Thank you for posting your listing! It is currently under
                  review to ensure quality and compliance.
                  <br />
                  <br />
                  Please check back later for updates on its status. We
                  appreciate your patience!
                </p>
              </ModalBody>
              <ModalFooter>
                <div className="flex w-full justify-center">
                  <Button
                    className="mb-5 bg-primary-600 text-white"
                    variant="light"
                    onPress={handleClick}
                  >
                    Preview
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ApprovalModal;

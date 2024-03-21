"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "@nextui-org/react";

import { useRouter } from "next/navigation";
import WatchIcon from "../svgs/WatchIcon";

const ExperienceApprovalModal: React.FC<any> = ({ isOpen, onClose, id }) => {
  const router = useRouter();

  function handleClick(): void {
    // router.push(`/listings/accommodations/${id}`);
    console.log("Preview");
    onClose();
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
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

export default ExperienceApprovalModal;

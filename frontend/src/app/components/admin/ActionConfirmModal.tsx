import type { ModalProps } from "@/app/interfaces/ModalProps";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";
import React from "react";

const ActionConfirmModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  size
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalContent>
          {(onClose) => (
            <>
              <div className="py-8">
                <ModalHeader className="text-bold flex flex-col gap-1 text-3xl ">
                  Are you sure?
                </ModalHeader>

                <ModalBody>
                  <p>
                    Deleting this report <strong>cannot</strong> be undone.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="bg-primary-800 text-white"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-primary text-white" onPress={onClose}>
                    Confirm
                  </Button>
                </ModalFooter>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ActionConfirmModal;

import { ModalProps } from "@/app/interfaces/ModalProps";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";
import React from "react";

interface ConfirmModalProps extends ModalProps {
  handleDelete: () => Promise<void>;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onClose,
  isOpen,
  size,
  handleDelete
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="top-center" size={size}>
      <ModalContent>
        {(onClose) => (
          <div className="p-5">
            <ModalHeader>
              <span className="text-xl font-bold">Are you sure?</span>
            </ModalHeader>
            <ModalBody>
              <span>
                Deleting this listing
                <span className="font-bold"> cannot </span>
                be undone.
              </span>
            </ModalBody>
            <ModalFooter className="w-full justify-end">
              <div>
                <Button
                  className="mr-2 rounded-full"
                  color="primary"
                  variant="bordered"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-full"
                  color="primary"
                  variant="solid"
                  onPress={handleDelete}
                >
                  Confirm
                </Button>
              </div>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;

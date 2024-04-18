import type { ModalProps } from "@/app/interfaces/ModalProps";
import { deleteReport } from "@/app/utils/helpers/report/request";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ActionConfirmModalProps extends ModalProps {
  id: number;
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionConfirmModal: React.FC<ActionConfirmModalProps> = ({
  isOpen,
  onClose,
  size,
  id,
  setActionDone
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleDelete(): Promise<void> {
    setIsLoading(true);
    const { hasError } = await deleteReport(id);
    setActionDone((prev) => !prev);
    if (hasError !== true) {
      onClose();
    }
    setIsLoading(false);
    router.refresh();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        placement="top-center"
      >
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
                    isDisabled={isLoading}
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary text-white"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    onPress={handleDelete}
                  >
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

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Link
} from "@nextui-org/react";
import type { ModalProps } from "../interfaces/ModalProps";
import DeleteIcon from "./svgs/DeleteIcon";
import ErrorMessage from "./ErrorMessage";

interface DeleteModalProps extends ModalProps {
  onDelete: () => Promise<boolean>;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState(false);
  async function handleDelete(): Promise<void> {
    const deleted = await onDelete();
    setIsDeleted(deleted);
    setError(!deleted);
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="mt-7 flex h-12 w-full justify-center">
                  <DeleteIcon />
                </div>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  {isDeleted ? "Successfully Deleted" : "Delete Listing"}
                </ModalHeader>
                <p className="mb-5 mt-1 text-center">
                  {isDeleted
                    ? "The listing has been successfully deleted."
                    : "Are you sure you want to delete this listing?"}
                </p>
                {error && <ErrorMessage message="Failed to delete listing." />}
              </ModalBody>

              <ModalFooter>
                <div className="flex w-full justify-center gap-5">
                  {isDeleted ? (
                    <Link href="/listings">
                      <Button
                        className="mb-5 bg-zinc-200 text-black"
                        variant="light"
                      >
                        Go to Listings
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Button
                        className="mb-5 bg-zinc-200 text-black"
                        variant="light"
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                      <Button
                        className="mb-5 bg-primary-600 text-white"
                        onClick={onClose}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;

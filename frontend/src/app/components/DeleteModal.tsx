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

const DeleteModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = (): void => {
    // Here, you can add your logic to handle the deletion process.
    // Once deletion is successful, update the state.
    // For example:
    // performDelete().then(() => setIsDeleted(true));
    setIsDeleted(true);
  };

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
                  <br />
                  <br />
                </p>
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

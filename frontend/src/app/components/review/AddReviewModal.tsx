import type { ModalProps } from "@/app/interfaces/ModalProps";
<<<<<<< HEAD
import { Modal, ModalContent } from "@nextui-org/react";
=======
import { Button, Modal, ModalContent } from "@nextui-org/react";
>>>>>>> c293b57d477ab4b63f6a6a28174828108f6f916f
import React from "react";
import ChevronLeftIcon from "../svgs/Calendar/ChevronLeftIcon";
import AddReviewForm from "./AddReviewForm";

const ReviewModal: React.FC<ModalProps> = ({ isOpen, onClose, size }) => {
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
<<<<<<< HEAD
                  <div
                    className="my-1 cursor-pointer self-start"
                    onClick={onClose}
                  >
                    <ChevronLeftIcon />
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-1 items-center text-2xl font-bold">
=======
                  <Button className="m-0 bg-white" isIconOnly onPress={onClose}>
                    <ChevronLeftIcon />
                  </Button>
                  <div className="flex flex-col">
                    <span className="my-1 items-center text-2xl font-bold">
>>>>>>> c293b57d477ab4b63f6a6a28174828108f6f916f
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
              <AddReviewForm />
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ReviewModal;

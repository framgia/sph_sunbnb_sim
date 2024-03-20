import type { ModalProps } from "@/app/interfaces/ModalProps";
import { Modal, ModalContent } from "@nextui-org/react";
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
                  <div
                    className="my-1 cursor-pointer self-start"
                    onClick={onClose}
                  >
                    <ChevronLeftIcon />
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-1 items-center text-2xl font-bold">
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

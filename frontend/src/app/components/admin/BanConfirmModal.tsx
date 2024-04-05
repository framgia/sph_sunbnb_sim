"use client";
import { ModalProps } from "@/app/interfaces/ModalProps";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  Textarea
} from "@nextui-org/react";
import React from "react";

const BanConfirmModal: React.FC<ModalProps> = ({ isOpen, onClose, size }) => {
  const dummydata = {
    user: "User 1"
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
        size={size}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className="px-5 py-5">
                <div className="mt-5">
                  <span className="">Are you sure you want to ban </span>
                  <span className="font-bold">{dummydata.user}</span>?
                </div>

                <Textarea
                  autoFocus
                  placeholder="Please write your reason so we can tell them why they were banned..."
                  minRows={10}
                  fullWidth
                  className="mt-5 px-5"
                />
              </div>
              <ModalFooter>
                <Button
                  className="bg-primary-800 text-white"
                  variant="flat"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BanConfirmModal;

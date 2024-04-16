"use client";
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
import LogoLargeIcon from "../svgs/LogoLargeIcon";
import { useRouter } from "next/navigation";

const ThankYouModal: React.FC<ModalProps> = ({ onClose, isOpen }) => {
  const router = useRouter();
  return (
    <div>
      <Modal
        className="p-5"
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  <span className="text-center text-xl font-bold">
                    Thank you for choosing
                  </span>
                </ModalHeader>
                <div className="mb-5 flex w-full justify-center">
                  <LogoLargeIcon />
                </div>
                <ModalFooter className="w-full justify-center">
                  <Button
                    onPress={() => {
                      router.replace("/history");
                    }}
                    color="primary"
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ThankYouModal;

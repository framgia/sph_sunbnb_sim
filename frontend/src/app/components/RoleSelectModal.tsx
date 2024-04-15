import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import type { ModalProps } from "../interfaces/ModalProps";
import RoleSelectForm from "./RoleSelectForm";

const RoleSelectModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  <span className="text-center text-xl font-bold">
                    Just one more thing!
                  </span>
                  <span className="text-center text-zinc-500">
                    Please choose one to proceed
                  </span>
                </ModalHeader>
                <RoleSelectForm />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RoleSelectModal;

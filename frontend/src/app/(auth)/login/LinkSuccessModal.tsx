import SuccessIcon from "@/app/components/svgs/SuccessIcon";
import type { ModalProps } from "@/app/interfaces/ModalProps";
import { Modal, ModalContent } from "@nextui-org/react";
import React from "react";

const LinkSuccessModal: React.FC<ModalProps> = ({ size, isOpen, onClose }) => {
  return (
    <div>
      <Modal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <div className="p-10">
              <div className="flex w-full justify-center">
                <SuccessIcon />
              </div>
              <div className="mb-5">
                <p className="mb-2 w-full text-center text-xl font-semibold">
                  Link Sent
                </p>
                <p className="w-full text-center text-sm text-zinc-500">
                  Please check your inbox and follow the provided link to reset
                  your password securely. If not found, check your spam folder.
                </p>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LinkSuccessModal;

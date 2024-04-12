"use client";
import type { ModalProps } from "@/app/interfaces/ModalProps";
import { UserDetailsType } from "@/app/interfaces/types";
import { banUser } from "@/app/utils/helpers/admin/request";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  Textarea
} from "@nextui-org/react";
import React from "react";

interface BanConfirmModalProps extends ModalProps {
  user: UserDetailsType;
  setIsActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const BanConfirmModal: React.FC<BanConfirmModalProps> = ({
  isOpen,
  onClose,
  size,
  user,
  setIsActionDone
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [reason, setReason] = React.useState("");
  async function onBanUser() {
    try {
      setIsLoading(true);

      await banUser(user.id, reason);
      setIsLoading(false);
      onClose();
    } catch (error) {
      setIsLoading(false);
      console.error("Error banning user:", error);
    }
  }
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
                  <span className="font-bold">
                    {user.first_name} {user.last_name}
                  </span>
                  ?
                </div>

                <Textarea
                  autoFocus
                  placeholder="Please write your reason so we can tell them why they were banned..."
                  minRows={10}
                  fullWidth
                  className="mt-5 px-5"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <ModalFooter>
                <Button
                  className="bg-primary-800 text-white"
                  variant="flat"
                  onPress={onClose}
                  isDisabled={isLoading}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onBanUser();
                    setIsActionDone((prev) => !prev);
                  }}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
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

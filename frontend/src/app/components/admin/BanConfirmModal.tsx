"use client";
import type { ModalProps } from "@/app/interfaces/ModalProps";
import type { UserDetailsType } from "@/app/interfaces/types";
import { banUser } from "@/app/utils/helpers/admin/request";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  Textarea
} from "@nextui-org/react";
import React from "react";
import ErrorMessage from "../ErrorMessage";

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
  const [error, setError] = React.useState("");
  async function onBanUser(): Promise<void> {
    try {
      if (reason.trim() !== "") {
        setIsLoading(true);

        await banUser(user.id, reason);
        setIsLoading(false);
        setIsActionDone((prev) => !prev);
        onClose();
      } else {
        setError("Reason should be provided.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
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
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                />
              </div>
              {error !== "" ? (
                <div className="px-10">
                  <ErrorMessage message={error} />
                </div>
              ) : null}
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
                  onPress={async () => {
                    await onBanUser();
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

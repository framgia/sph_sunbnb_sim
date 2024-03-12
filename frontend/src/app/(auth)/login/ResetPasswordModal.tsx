import type { ModalProps } from "@/app/interfaces/ModalProps";
import { Button, Input, Modal, ModalContent } from "@nextui-org/react";
import React from "react";

interface ResetModalProps extends ModalProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const ResetPasswordModal: React.FC<ResetModalProps> = ({
  size,
  isOpen,
  onClose,
  onSubmit,
  email,
  setEmail
}) => {
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  return (
    <div>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <div className="p-10">
              <form onSubmit={onSubmit}>
                <div className="mb-5">
                  <p className="mb-2 w-full text-center text-xl font-semibold">
                    Reset Password
                  </p>
                  <p className="w-full text-center text-sm text-zinc-500">
                    Enter the email address associated with your account and
                    we&apos;ll send you a link to reset your password.
                  </p>
                </div>
                <Input
                  type="email"
                  variant="bordered"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <div className="mt-5 flex justify-end">
                  <Button
                    onPress={onClose}
                    variant="light"
                    className="mr-2 text-primary-600"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary-600 text-white">
                    Send
                  </Button>
                </div>
              </form>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ResetPasswordModal;

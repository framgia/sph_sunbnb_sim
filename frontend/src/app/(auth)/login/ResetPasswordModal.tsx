import type { ModalProps } from "@/app/interfaces/ModalProps";
import { Button, Input, Modal, ModalContent, Spinner } from "@nextui-org/react";
import React from "react";

interface ResetModalProps extends ModalProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  error: Record<string, string | boolean>;
}

const ResetPasswordModal: React.FC<ResetModalProps> = ({
  size,
  isOpen,
  onClose,
  onSubmit,
  email,
  setEmail,
  loading,
  error
}) => {
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
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
                  isInvalid={error.hasError as boolean}
                  errorMessage={error.message as string}
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
                  <Button
                    type="submit"
                    className="bg-primary-600 text-white"
                    isDisabled={loading}
                    isLoading={loading}
                  >
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

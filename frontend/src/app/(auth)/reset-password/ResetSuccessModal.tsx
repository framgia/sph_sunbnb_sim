import SuccessIcon from "@/app/components/svgs/SuccessIcon";
import type { ModalProps } from "@/app/interfaces/ModalProps";
import { Button, Modal, ModalContent } from "@nextui-org/react";
import React from "react";

interface ResetSuccessProps extends ModalProps {
    onPress: () => void;
}

const ResetSuccessModal: React.FC<ResetSuccessProps> = ({
    size,
    isOpen,
    onClose,
    onPress
}) => {
    return (
        <div>
            <Modal size={size} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <div className="p-10">
                            <div className="flex w-full justify-center">
                                <SuccessIcon />
                            </div>
                            <div className="mb-5">
                                <p className="mb-2 w-full text-center text-xl font-semibold">
                                    Successful password reset!
                                </p>
                                <p className="w-full text-center text-sm text-zinc-500">
                                    You can now use your new password to login
                                    to your account.
                                </p>
                            </div>
                            <div className="flex w-full justify-center">
                                <Button
                                    className="bg-primary-600 text-white"
                                    onPress={onPress}
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ResetSuccessModal;

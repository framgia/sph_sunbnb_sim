import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "@nextui-org/react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const ApprovalModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <HeaderImage
                                    src="/images/watch.svg"
                                    alt="Approval Pending"
                                    additionalClasses="w-12 h-12 mt-7"
                                />
                                <ModalHeader className="flex flex-col gap-1 text-center">
                                    Waiting for Approval
                                </ModalHeader>
                                <p className="mb-5 mt-1 text-center">
                                    Thank you for posting your listing! It is
                                    currently under review to ensure quality and
                                    compliance.
                                    <br />
                                    <br />
                                    Please check back later for updates on its
                                    status. We appreciate your patience!
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex w-full justify-center">
                                    <Button
                                        className="mb-5 bg-primary-600 text-white"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        Preview
                                    </Button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

const HeaderImage = ({
    src,
    alt,
    additionalClasses
}: {
    src: string;
    alt: string;
    additionalClasses: string;
}): React.ReactNode => (
    <img
        loading="lazy"
        src={src}
        alt={alt}
        className={`mx-auto ${additionalClasses}`}
    />
);

export default ApprovalModal;

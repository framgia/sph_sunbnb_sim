"use client";
import React, { useState } from "react";
import LoginForm from "@/app/(auth)/login/LoginForm";
import { useDisclosure } from "@nextui-org/react";
import ResetPasswordModal from "./ResetPasswordModal";
import LinkSuccessModal from "./LinkSuccessModal";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isValid, setValid] = useState(false);
    const router = useRouter();

    function onSuccess(): void {
        onClose();
        router.replace("reset-password");
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <LoginForm onResetPress={onOpen} />
            {!isValid ? (
                <ResetPasswordModal
                    size="sm"
                    isOpen={isOpen}
                    onClose={onClose}
                    onSubmit={() => {
                        setValid(true);
                    }}
                />
            ) : (
                <LinkSuccessModal
                    size="sm"
                    isOpen={isOpen}
                    onClose={() => {
                        onSuccess();
                    }}
                />
            )}
        </main>
    );
};

export default LoginPage;

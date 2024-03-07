"use client";
import LogoLargeIcon from "@/app/components/svgs/LogoLargeIcon";
import React from "react";
import ResetPasswordForm from "./ResetForm";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@nextui-org/react";
import ResetSuccessModal from "./ResetSuccessModal";

const ResetPasswordPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    function HandleSubmit(event: React.FormEvent): void {
        event.preventDefault();
        onOpen();
    }
    function HandleLogin(): void {
        onClose();
        router.replace("login");
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-start px-24 py-10">
            <LogoLargeIcon />
            <div className="w-2/5">
                <div className="my-5 flex flex-col">
                    <span className="text-center text-xl font-bold">
                        Reset your password
                    </span>
                    <span className="w-4/5 self-center text-center text-zinc-500">
                        Enter a new password below to gain access to your
                        account.
                    </span>
                </div>
                <div className="w-full">
                    <ResetPasswordForm handleSubmit={HandleSubmit} />
                </div>
            </div>
            <ResetSuccessModal
                size="sm"
                isOpen={isOpen}
                onClose={HandleLogin}
                onPress={HandleLogin}
            />
        </main>
    );
};

export default ResetPasswordPage;

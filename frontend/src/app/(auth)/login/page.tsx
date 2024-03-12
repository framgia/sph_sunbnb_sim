"use client";
import React, { useState } from "react";
import LoginForm from "@/app/(auth)/login/LoginForm";
import { useDisclosure } from "@nextui-org/react";
import ResetPasswordModal from "./ResetPasswordModal";
import LinkSuccessModal from "./LinkSuccessModal";
import { useRouter } from "next/navigation";
import { forgetPassword } from "@/app/utils/helpers/passwordHelper";

const LoginPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isValid, setValid] = useState(false);

  const [email, setEmail] = useState("");

  const router = useRouter();

  function onSuccess(): void {
    onClose();
    router.replace("reset-password");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    console.log("Submitting");
    const result = await forgetPassword(email);
    setValid(result);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LoginForm onResetPress={onOpen} />
      {!isValid ? (
        <ResetPasswordModal
          size="sm"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
          email={email}
          setEmail={setEmail}
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

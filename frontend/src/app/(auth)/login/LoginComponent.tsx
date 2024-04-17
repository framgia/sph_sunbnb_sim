"use client";
import React, { useState } from "react";
import LoginForm from "@/app/(auth)/login/LoginForm";
import { useDisclosure } from "@nextui-org/react";
import ResetPasswordModal from "./ResetPasswordModal";
import LinkSuccessModal from "./LinkSuccessModal";
import { signIn } from "next-auth/react";
import { forgetPassword } from "@/app/utils/helpers/password/request";
import { validateForgetPassword } from "@/app/utils/helpers/password/validation";

const LoginComponent: React.FC<{ banReason?: string }> = ({ banReason }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isValid, setValid] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Record<string, string | boolean>>({
    hasError: false,
    message: ""
  });
  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const validateData = validateForgetPassword(email);
    if (validateData.hasError === true) {
      setError({
        message: validateData.message,
        hasError: validateData.hasError
      });
    } else {
      setIsLoading(true);
      const result = await forgetPassword(email);
      setIsLoading(false);
      if (result.hasError === true) {
        setError({
          message: result.message,
          hasError: result.hasError
        });
      } else setValid(true);
    }
  }

  return (
    <>
      <LoginForm
        onResetPress={() => {
          onOpen();
        }}
        googleButton={async () => {
          await signIn("google");
        }}
        banReason={banReason}
      />
      {!isValid ? (
        <ResetPasswordModal
          size="sm"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
          email={email}
          setEmail={setEmail}
          loading={isLoading}
          error={error}
        />
      ) : (
        <LinkSuccessModal size="sm" isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

export default LoginComponent;

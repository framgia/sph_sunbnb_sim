"use client";
import LogoLargeIcon from "@/app/components/svgs/LogoLargeIcon";
import React, { useState } from "react";
import ResetPasswordForm from "./ResetForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useDisclosure } from "@nextui-org/react";
import ResetSuccessModal from "./ResetSuccessModal";
import {
  resetPassword,
  validateResetPassword
} from "@/app/utils/helpers/passwordHelper";

const ResetPasswordPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<Record<string, string>>({
    token: searchParams.get("token") ?? "",
    email: searchParams.get("email") ?? "",
    password: "",
    password_confirmation: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Record<string, string | boolean>>({
    hasError: false,
    message: ""
  });

  async function HandleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    const validateData = validateResetPassword(data);
    if (validateData.hasError as boolean) {
      setError({
        message: validateData.message,
        hasError: validateData.hasError
      });
    } else {
      setIsLoading(true);
      const result = await resetPassword(data);
      setIsLoading(false);
      if (result.hasError === true) {
        setError({
          message: result.message,
          hasError: result.hasError
        });
      } else {
        onOpen();
      }
    }
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
            Enter a new password below to gain access to your account.
          </span>
        </div>
        <div className="w-full">
          <ResetPasswordForm
            handleSubmit={HandleSubmit}
            data={data}
            setData={setData}
            error={error}
            loading={isLoading}
          />
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

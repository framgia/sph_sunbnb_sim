"use client";
import { Button, Input, RadioGroup } from "@nextui-org/react";
import React, { type FormEvent, useRef, useState } from "react";
import RadioCard from "../../components/RadioCard";
import HostIcon from "@/app/components/svgs/SignUp/HostIcon";
import GuestIcon from "@/app/components/svgs/SignUp/GuestIcon";
import DividerText from "@/app/components/DividerText";
import GoogleButton from "@/app/components/GoogleButton";

import { registerUser } from "@/app/utils/helpers/userHelper";
import { useRouter } from "next/navigation";

interface SignUpFormProps {
  googleButton: () => void;
}
const SignUpForm: React.FC<SignUpFormProps> = ({ googleButton }) => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [userRole, setRole] = useState<"host" | "guest">("host");
  const [isEmailInvalid, setEmailInvalid] = useState(false);
  const [isPasswordLess8, setPasswordLess8] = useState(false);
  const [passwordsNotMatch, setPasswordsNotMatch] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  function isInvalidText(text: string): boolean {
    if (text === undefined || text.trim() === "") {
      return true;
    } else {
      return false;
    }
  }
  function isValidEmail(email: string): boolean {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    setMessage("");
    if (
      isInvalidText(firstNameRef?.current?.value ?? "") ||
      isInvalidText(lastNameRef?.current?.value ?? "") ||
      isInvalidText(emailRef?.current?.value ?? "") ||
      isInvalidText(passwordRef?.current?.value ?? "") ||
      isInvalidText(confirmPasswordRef?.current?.value ?? "")
    ) {
      return;
    }
    if (!isValidEmail(emailRef?.current?.value ?? "")) {
      setEmailInvalid(true);
      return;
    } else {
      setEmailInvalid(false);
    }

    if ((passwordRef?.current?.value?.length ?? 0) < 8) {
      setPasswordLess8(true);
      return;
    } else {
      setPasswordLess8(false);
    }

    if (passwordRef?.current?.value !== confirmPasswordRef?.current?.value) {
      setPasswordsNotMatch(true);
      return;
    } else {
      setPasswordsNotMatch(false);
    }

    const user = {
      first_name: firstNameRef?.current?.value ?? "",
      last_name: lastNameRef?.current?.value ?? "",
      email: emailRef?.current?.value ?? "",
      password: passwordRef?.current?.value ?? "",
      password_confirmation: confirmPasswordRef?.current?.value ?? "",
      role: userRole
    };

    setLoading(true);

    const apiRes = await registerUser(user);
    setLoading(false);
    if (apiRes.message !== "success") {
      setMessage(apiRes.message);
    } else {
      router.replace("/");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      {message !== "" ? (
        <div className="rounded-xl p-2 py-5 text-danger">{message}</div>
      ) : (
        ""
      )}
      <div className="mb-2 mb-2 flex flex-row">
        <Input
          variant="bordered"
          className="mr-2"
          placeholder="First Name"
          name="firstName"
          ref={firstNameRef}
          isRequired={true}
        />
        <Input
          variant="bordered"
          className="ml-2"
          placeholder="Last Name"
          name="lastName"
          ref={lastNameRef}
          isRequired={true}
        />
      </div>
      <Input
        className="mb-2"
        variant="bordered"
        type="email"
        placeholder="Email"
        name="email"
        errorMessage={isEmailInvalid ? "Please enter a valid email" : ""}
        isInvalid={isEmailInvalid}
        ref={emailRef}
        isRequired={true}
      />
      <Input
        className="mb-2"
        variant="bordered"
        type="password"
        name="password"
        placeholder="Password"
        isInvalid={isPasswordLess8}
        errorMessage={
          isPasswordLess8 ? "Password must be at least 8 characters" : ""
        }
        ref={passwordRef}
        isRequired={true}
      />
      <Input
        className="mb-2"
        variant="bordered"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        ref={confirmPasswordRef}
        isInvalid={passwordsNotMatch}
        errorMessage={
          passwordsNotMatch ? "Please make sure your passwords match." : ""
        }
        isRequired={true}
      />

      <div className="justify-content-center mt-10 flex">
        <span className="w-full text-center">Select a Role</span>
      </div>
      <RadioGroup name="role" className="mb-10" defaultValue="host">
        <div className="flex w-full flex-row justify-between">
          <RadioCard
            className="m-2"
            description="List accommodations or experiences"
            value="host"
            onClick={() => {
              setRole("host");
            }}
          >
            <HostIcon />
            <span className="font-bold">Host</span>
          </RadioCard>
          <RadioCard
            className="m-2"
            description="Browse and book unique stays"
            value="guest"
            onClick={() => {
              setRole("guest");
            }}
          >
            <GuestIcon />
            <span className="font-bold">Guest</span>
          </RadioCard>
        </div>
      </RadioGroup>
      <Button
        isDisabled={isLoading}
        type="submit"
        className="w-full bg-primary-600 text-white"
      >
        Register
      </Button>
      <DividerText>or register using</DividerText>
      <GoogleButton onPress={googleButton} />
    </form>
  );
};

export default SignUpForm;

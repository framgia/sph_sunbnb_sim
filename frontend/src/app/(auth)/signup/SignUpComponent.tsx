"use client";
import { registerUser } from "@/app/utils/userHelper";
import React from "react";
import { useFormState } from "react-dom";
import SignUpForm from "./SignUpForm";

const SignUpComponent: React.FC = () => {
  const [state, formAction] = useFormState(registerUser, { message: "" });
  return <SignUpForm formState={state} formAction={formAction} />;
};

export default SignUpComponent;

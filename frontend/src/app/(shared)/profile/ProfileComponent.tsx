"use client";
import React, { useState } from "react";
import LegalNameField from "./LegalNameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

const ProfileComponent: React.FC = () => {
  const [PersonalSectionActive, setPersonalActive] = useState(true);
  const [LoginSectionActive, setLoginActive] = useState(true);
  const [LegalActive, setLegalActive] = useState(true);
  const [EmailActive, setEmailActive] = useState(true);
  const [PasswordActive, setPasswordActive] = useState(true);

  //  functions for handling dynamic changing of colors
  function ResetAll(): void {
    setPersonalActive(true);
    setLoginActive(true);
    setLegalActive(true);
    setEmailActive(true);
    setPasswordActive(true);
  }

  function onFocusLegal(): void {
    setPersonalActive(true);
    setLoginActive(false);
    setLegalActive(true);
    setEmailActive(false);
    setPasswordActive(false);
  }

  function onFocusEmail(): void {
    setPersonalActive(false);
    setLoginActive(true);
    setLegalActive(false);
    setEmailActive(true);
    setPasswordActive(false);
  }

  function onFocusPassword(): void {
    setPersonalActive(false);
    setLoginActive(true);
    setLegalActive(false);
    setEmailActive(false);
    setPasswordActive(true);
  }
  return (
    <main className="flex flex-col">
      <span
        className={
          "flex w-full text-lg font-semibold" +
          (PersonalSectionActive ? " " : " text-foreground-300")
        }
      >
        Personal Information
      </span>
      <div className="my-5 w-full">
        <LegalNameField
          firstName="John"
          lastName="Doe"
          onEdit={onFocusLegal}
          onCancel={ResetAll}
          onUpdate={() => {}}
          enabled={LegalActive}
        />
      </div>
      <span
        className={
          "flex w-full text-lg font-semibold" +
          (LoginSectionActive ? " " : " text-foreground-300")
        }
      >
        Login and Security
      </span>
      <div className="my-5 w-full">
        <EmailField
          email="john.doe@gmail.com"
          onEdit={onFocusEmail}
          onCancel={ResetAll}
          onUpdate={() => {}}
          enabled={EmailActive}
        />
      </div>
      {/*  Passwordfield should be hidden if user is not using OAuth   */}
      <div className="my-5 w-full">
        <PasswordField
          onEdit={onFocusPassword}
          onCancel={ResetAll}
          onUpdate={() => {}}
          enabled={PasswordActive}
        />
      </div>
    </main>
  );
};

export default ProfileComponent;

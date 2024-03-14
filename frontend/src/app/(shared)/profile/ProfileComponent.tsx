"use client";
import React, { useState } from "react";
import LegalNameField from "./LegalNameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import type { UserSessionType } from "@/app/interfaces/types";

interface ProfileComponentsProps {
  user: UserSessionType | null;
}

const ProfileComponent: React.FC<ProfileComponentsProps> = ({ user }) => {
  const [PersonalSectionActive, setPersonalActive] = useState(true);
  const [LoginSectionActive, setLoginActive] = useState(true);
  const [LegalActive, setLegalActive] = useState(true);
  const [EmailActive, setEmailActive] = useState(true);
  const [PasswordActive, setPasswordActive] = useState(true);
  const isProvider: boolean = user !== null && user.provider === null;

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
    <main className="flex min-h-screen flex-col">
      {user !== null && (
        <>
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
              user={user}
              onEdit={onFocusLegal}
              onCancel={ResetAll}
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
              user={user}
              onEdit={onFocusEmail}
              onCancel={ResetAll}
              enabled={EmailActive}
              showUpdateButton={isProvider}
            />
          </div>
          {isProvider && (
            <div className="my-5 w-full">
              <PasswordField
                user={user}
                onEdit={onFocusPassword}
                onCancel={ResetAll}
                enabled={PasswordActive}
              />
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default ProfileComponent;

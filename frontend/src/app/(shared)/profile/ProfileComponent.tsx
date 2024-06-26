"use client";
import React, { useState } from "react";
import LegalNameField from "./LegalNameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";
import type { UserDetailsType } from "@/app/interfaces/types";

interface ProfileComponentsProps {
  user: UserDetailsType | null;
  isAdmin: boolean;
}

const ProfileComponent: React.FC<ProfileComponentsProps> = ({
  user,
  isAdmin
}) => {
  const [PersonalSectionActive, setPersonalActive] = useState(true);
  const [LoginSectionActive, setLoginActive] = useState(true);
  const [LegalActive, setLegalActive] = useState(true);
  const [EmailActive, setEmailActive] = useState(true);
  const [PasswordActive, setPasswordActive] = useState(true);
  const isProvider: boolean = user !== null && user.provider === null;

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
              isAdmin={isAdmin}
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
              isAdmin={isAdmin}
            />
          </div>
          {isProvider && (
            <div className="my-5 w-full">
              <PasswordField
                user={user}
                onEdit={onFocusPassword}
                onCancel={ResetAll}
                enabled={PasswordActive}
                isAdmin={isAdmin}
              />
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default ProfileComponent;

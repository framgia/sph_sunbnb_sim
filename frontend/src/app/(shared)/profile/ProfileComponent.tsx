"use client";
import React, { useEffect, useState } from "react";
import LegalNameField from "./LegalNameField";
import EmailField from "./EmailField";
import PasswordField from "./PasswordField";

// interface: user
interface ProfileComponentsProps {
    user: {
        id: number;
        first_name: string;
        last_name: string;
        role: string;
        status: string;
        email: string;
        email_verified_at: string | null;
        provider: string | null;
        provider_id: string | null;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    } 
    | null
}

const ProfileComponent: React.FC <ProfileComponentsProps> = ({ user }) => {
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
        <main className="flex min-h-screen flex-col">
            {user && (
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
              firstName={user.first_name}
              lastName={user.last_name}
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
                    email={user.email}
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
            </>
            )}
        </main>
    );
};

export default ProfileComponent;

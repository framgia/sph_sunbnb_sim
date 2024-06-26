"use client";
import React from "react";
import DividerText from "../DividerText";
import GoogleButton from "../GoogleButton";
import { signIn } from "next-auth/react";

interface DefaultStickyProps {
  ForAccommodation: boolean;
}
const DefaultSticky: React.FC<DefaultStickyProps> = ({ ForAccommodation }) => {
  return (
    <div className="w-full">
      <div className="mb-1 w-full rounded-xl border border-1 border-black p-5 shadow-lg">
        <div className="flex w-full justify-center p-2">
          <span className="w-full text-center text-lg font-bold">
            You must login to book{" "}
            {ForAccommodation ? "accommodations" : "experiences"}.
          </span>
        </div>
        <DividerText>or continue using</DividerText>
        <div className="p-2">
          <GoogleButton
            onPress={async () => {
              await signIn("google");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DefaultSticky;

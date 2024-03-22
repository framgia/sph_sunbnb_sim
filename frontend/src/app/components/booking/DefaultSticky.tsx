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
    <div>
      <div className="w-80">
        <div className="mb-1 w-full rounded-xl border border-1 border-black p-5 shadow-lg">
          <div className="flex w-full justify-center p-2">
            <span className="w-full text-center text-2xl font-bold">
              You must login to book{" "}
              {ForAccommodation ? "accommodations" : "experiences"}.
            </span>
          </div>
          <DividerText>or continue using</DividerText>
          <div className="p-2">
            <GoogleButton
              onPress={() => {
                signIn("google");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultSticky;

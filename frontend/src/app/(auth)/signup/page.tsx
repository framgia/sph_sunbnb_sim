import React from "react";
import LogoLargeIcon from "@/app/components/svgs/LogoLargeIcon";
import Link from "next/link";
import SignUpComponent from "./SignUpComponent";

const SignUpPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LogoLargeIcon />
      <div className="my-10 flex flex-col">
        <span className="text-center text-xl font-bold">
          Let&apos;s get started!
        </span>
        <span className="text-center text-zinc-500">
          Create an account to book or list a space
        </span>
      </div>
      <SignUpComponent />
      <span className="mt-5 text-sm">
        Already have an account?{" "}
        <Link href="/login">
          <span className="text-[#ff2200]"> Sign in </span>
        </Link>
      </span>
    </main>
  );
};

export default SignUpPage;

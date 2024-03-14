import React from "react";
import LoginComponent from "./LoginComponent";
import LogoLargeIcon from "@/app/components/svgs/LogoLargeIcon";

const LoginPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="flex w-full justify-center">
        <LogoLargeIcon />
      </div>
      <div />
      <div className="mt-9 w-full text-center text-xl font-semibold leading-7 text-black">
        Welcome back!
      </div>
      <div className="w-full text-center text-sm leading-5 text-zinc-500">
        Login to continue booking or listing
      </div>
      <LoginComponent />
    </main>
  );
};

export default LoginPage;

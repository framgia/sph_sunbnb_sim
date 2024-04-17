import React from "react";
import LoginComponent from "./LoginComponent";
import LogoLargeIcon from "@/app/components/svgs/LogoLargeIcon";
import { loginWithGoogle } from "@/app/utils/helpers/userHelper";

const LoginPage: React.FC = async ({
  searchParams
}: {
  searchParams?: {
    idtoken?: string;
  };
}) => {
  let banReason = "";
  if (searchParams?.idtoken !== undefined || searchParams?.idtoken !== "") {
    const resData = await loginWithGoogle(searchParams?.idtoken ?? "");
    if (resData.message.includes("banned")) {
      banReason = resData.message;
    }
  }
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="flex w-full justify-center">
        <LogoLargeIcon />
      </div>
      <div />
      <div className="mt-10 w-full text-center text-xl font-semibold leading-7 text-black">
        Welcome back!
      </div>
      <div className="mb-10 w-full text-center text-sm leading-5 text-zinc-500">
        Login to continue booking or listing
      </div>
      <LoginComponent banReason={banReason} />
    </main>
  );
};

export default LoginPage;

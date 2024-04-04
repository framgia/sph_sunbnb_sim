import LogoLargeIcon from "@/app/components/svgs/LogoLargeIcon";
import React from "react";
import AdminLoginForm from "./AdminLoginForm";

const AdminLoginPage: React.FC = () => {
  return (
    <div>
      <main className="flex flex-col items-center justify-between">
        <div className="flex w-full justify-center">
          <LogoLargeIcon />
        </div>
        <div />
        <div className="mt-10 w-full text-center text-xl font-semibold leading-7 text-black">
          Welcome back, Admin!
        </div>
        <div className="mb-5 w-full text-center text-sm leading-5 text-zinc-500">
          Login to manage users and listings
        </div>
        <AdminLoginForm />
      </main>
    </div>
  );
};

export default AdminLoginPage;

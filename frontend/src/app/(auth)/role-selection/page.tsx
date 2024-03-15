import RoleSelectForm from "@/app/components/RoleSelectForm";
import LogoLargeIcon from "@/app/components/svgs/LogoLargeIcon";
import React from "react";

const RoleSelectPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-between">
      <LogoLargeIcon />
      <div className="flex flex-col p-5">
        <span className="text-center text-xl font-bold">
          Just one more thing!
        </span>
        <span className="text-center text-zinc-500">
          Please choose one to proceed
        </span>
      </div>
      <div className="p-2">
        <RoleSelectForm />
      </div>
    </main>
  );
};

export default RoleSelectPage;

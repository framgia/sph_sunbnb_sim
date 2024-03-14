"use client";
import RadioCard from "@/app/components/RadioCard";
import GuestIcon from "@/app/components/svgs/SignUp/GuestIcon";
import HostIcon from "@/app/components/svgs/SignUp/HostIcon";
import { Button, RadioGroup } from "@nextui-org/react";
import React, { useState } from "react";

const RoleSelectForm: React.FC = () => {
  const [roleSelected, setRole] = useState("host");
  const [isLoading, setLoading] = useState(false);
  return (
    <form>
      <RadioGroup name="role" className="mb-10" defaultValue={roleSelected}>
        <div className="flex w-full flex-row justify-center">
          <RadioCard
            className="w-24"
            description="List accommodations or experiences"
            value="host"
            onClick={() => {
              setRole("host");
            }}
          >
            <HostIcon />
            <span className="font-bold">Host</span>
          </RadioCard>
          <RadioCard
            className="w-24"
            description="Browse and book unique stays"
            value="guest"
            onClick={() => {
              setRole("guest");
            }}
          >
            <GuestIcon />
            <span className="font-bold">Guest</span>
          </RadioCard>
        </div>
      </RadioGroup>
      <Button
        isDisabled={isLoading}
        type="submit"
        className="mb-10 w-full bg-primary-600 text-white"
      >
        Continue
      </Button>
    </form>
  );
};

export default RoleSelectForm;

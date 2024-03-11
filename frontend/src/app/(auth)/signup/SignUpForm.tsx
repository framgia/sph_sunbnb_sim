import { Button, Input, RadioGroup } from "@nextui-org/react";
import React from "react";
import RadioCard from "./RadioCard";
import HostIcon from "@/app/components/svgs/SignUp/HostIcon";
import GuestIcon from "@/app/components/svgs/SignUp/GuestIcon";
import DividerText from "@/app/components/DividerText";
import GoogleButton from "@/app/components/GoogleButton";

const SignUpForm: React.FC = () => {
  return (
    <form>
      <div className="mb-2 mb-2 flex flex-row">
        <Input
          variant="bordered"
          className="mr-2"
          placeholder="First Name"
          name="firstName"
          required
        />
        <Input
          variant="bordered"
          className="ml-2"
          placeholder="Last Name"
          name="lastName"
          required
        />
      </div>
      <Input
        className="mb-2"
        variant="bordered"
        type="email"
        placeholder="Email"
        name="email"
        errorMessage="Please enter a valid email"
        required
      />
      <Input
        className="mb-2"
        variant="bordered"
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <Input
        className="mb-2"
        variant="bordered"
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        required
      />

      <div className="justify-content-center mt-10 flex">
        <span className="w-full text-center">Select a Role</span>
      </div>
      <RadioGroup name="role" className="mb-10" defaultValue="host">
        <div className="flex w-full flex-row justify-between">
          <RadioCard
            className="m-2"
            description="List accommodations or experiences"
            value="host"
          >
            <HostIcon />
            <span className="font-bold">Host</span>
          </RadioCard>
          <RadioCard
            className="m-2"
            description="Browse and book unique stays"
            value="guest"
          >
            <GuestIcon />
            <span className="font-bold">Guest</span>
          </RadioCard>
        </div>
      </RadioGroup>
      <Button className="w-full bg-primary-600 text-white">Register</Button>
      <DividerText>or register using</DividerText>
      <GoogleButton />
    </form>
  );
};

export default SignUpForm;

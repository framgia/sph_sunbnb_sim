import { Button, Input, RadioGroup } from "@nextui-org/react";
import React from "react";
import RadioCard from "./RadioCard";
import HostIcon from "@/app/components/svgs/SignUp/HostIcon";
import GuestIcon from "@/app/components/svgs/SignUp/GuestIcon";
import DividerText from "@/app/components/DividerText";
import GoogleIcon from "@/app/components/svgs/Google";

const SignUpForm: React.FC = () => {
    return (
        <form>
            <div className="mb-2 mb-2 flex flex-row">
                <Input
                    variant="bordered"
                    className="mr-2"
                    placeholder="First Name"
                    required
                />
                <Input
                    variant="bordered"
                    className="ml-2"
                    placeholder="Last Name"
                    required
                />
            </div>
            <Input
                className="mb-2"
                variant="bordered"
                type="email"
                placeholder="Email"
                required
            />
            <Input
                className="mb-2"
                variant="bordered"
                type="password"
                placeholder="Password"
                required
            />
            <Input
                className="mb-2"
                variant="bordered"
                type="password"
                placeholder="Confirm Password"
                required
            />

            <div className="justify-content-center mt-10 flex">
                <span className="w-full text-center">Select a Role</span>
            </div>
            <RadioGroup className="mb-10" defaultValue="host">
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
            <Button className="w-full bg-primary-600 text-white">
                Register
            </Button>
            <DividerText>or register using</DividerText>
            <Button className="w-full" variant="bordered">
                <span className="flex flex-row justify-center font-medium">
                    <span className="mx-2">
                        <GoogleIcon />
                    </span>
                    <span className="self-center">Google</span>
                </span>
            </Button>
        </form>
    );
};

export default SignUpForm;

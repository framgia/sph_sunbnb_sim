"use client";

import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import LogoLargeIcon from "../../components/svgs/LogoLargeIcon";
import GoogleButton from "../../components/GoogleButton";
import DividerText from "../../components/DividerText";
import Link from "next/link";

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <form
            className="flex max-w-[500px] flex-col px-5"
            onSubmit={handleSubmit}
        >
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
            <div className="mt-8 flex max-w-[500px] flex-col px-5">
                <label htmlFor="email"></label>
                <div>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        variant="bordered"
                        onChange={handleEmailChange}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="mt-8 flex max-w-[500px] flex-col px-5">
                <label htmlFor="email"></label>
                <div>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        variant="bordered"
                        onChange={handlePasswordChange}
                        className="w-full"
                    />
                </div>
            </div>

            <Link
                href="ForgotPassword"
                className="mt-2 self-end whitespace-nowrap text-sm leading-5 text-red-600"
            >
                Forgot Password?
            </Link>
            <Button className="mt-10 w-full items-center justify-center whitespace-nowrap rounded-xl bg-primary-600 px-16 py-2 text-center text-base font-medium leading-6 text-white">
                Login
            </Button>
            <DividerText>or login using</DividerText>
            <GoogleButton />
            <div className="mt-8 flex justify-between gap-2 whitespace-nowrap px-11 text-sm leading-5">
                <div className="grow text-black">Don’t have an account?</div>
                <Link href="/signup" className="text-primary-600">
                    Sign up
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;

import React, { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";

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
            {/* 
            convert to svg
            <div className="w-full flex justify-center">
                <Image
                loading="lazy"
                alt="logo"
                src="/images/sunbnblogo.svg"
                className="mt-14 w-15 h-auto"
            />
            </div> */}

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

            <a
                href="ForgotPassword"
                className="mt-2 self-end whitespace-nowrap text-sm leading-5 text-red-600"
            >
                Forgot Password?
            </a>
            <Button
                as={Link}
                href="#"
                className="mt-10 w-full items-center justify-center whitespace-nowrap rounded-xl bg-primary-600 px-16 py-2 text-center text-base font-medium leading-6 text-white"
            >
                Login
            </Button>
            <div className="mt-4 flex items-center justify-center gap-1 text-xs leading-4 text-zinc-500">
                <div className="my-auto h-px w-[108px] self-stretch bg-neutral-900 bg-opacity-10" />
                <div className="self-stretch text-center">or login using</div>
                <div className="my-auto h-px w-[108px] self-stretch bg-neutral-900 bg-opacity-10" />
            </div>
            <Button
                as={Link}
                href="#"
                className="bg-colors-base-default mt-4 flex w-full items-center justify-center whitespace-nowrap rounded-xl border-2 border-solid border-[color:var(--colors-base-default,#D4D4D8)] px-16 py-2 text-base font-medium leading-6 text-black"
            >
                <div className="flex gap-3">
                    {/* convert to svg    <img
                        loading="lazy"
                        src="/images/devicon_google.svg"
                        className="w-6 aspect-square"
                    />
                    <div>Google</div> */}
                </div>
            </Button>
            <div className="mt-8 flex justify-between gap-2 whitespace-nowrap px-11 text-sm leading-5">
                <div className="grow text-black">Don’t have an account?</div>
                <a href="/signup" className="text-red-600">
                    Sign up
                </a>
            </div>
        </form>
    );
};

export default LoginForm;

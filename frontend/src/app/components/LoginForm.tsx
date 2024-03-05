import React, { useState } from "react";
import { Input, Button, Link} from "@nextui-org/react";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <form className="flex flex-col px-5 max-w-[500px]" onSubmit={handleSubmit}>
            <img
                loading="lazy"
                src="/images/sunbnblogo.svg"
                className="mt-14 w-15 h-auto"
            />
            <div className="mt-9 w-full text-xl font-semibold leading-7 text-center text-black">
                Welcome back!
            </div>
            <div className="w-full text-sm leading-5 text-center text-zinc-500">
                Login to continue booking or listing
            </div>
            <div className="flex flex-col px-5 max-w-[500px] mt-8">
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

            <div className="flex flex-col px-5 max-w-[500px] mt-8">
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

            <a href="ForgotPassword" className="self-end mt-2 text-sm leading-5 text-red-600 whitespace-nowrap">
                Forgot Password?
            </a>
            <Button
                as={Link}
                href="#"
                className="justify-center text-center items-center px-16 py-2 mt-10 w-full text-base font-medium leading-6 text-white whitespace-nowrap bg-primary-600 rounded-xl"
            >
                Login
            </Button>
            <div className="flex gap-1 justify-center items-center mt-4 text-xs leading-4 text-zinc-500">
                <div className="self-stretch my-auto h-px bg-neutral-900 bg-opacity-10 w-[108px]" />
                <div className="self-stretch text-center">or login using</div>
                <div className="self-stretch my-auto h-px bg-neutral-900 bg-opacity-10 w-[108px]" />
            </div>
            <Button
                as={Link}
                href="#"
                className="flex justify-center items-center px-16 py-2 mt-4 w-full text-base font-medium leading-6 text-black whitespace-nowrap rounded-xl border-2 border-solid border-[color:var(--colors-base-default,#D4D4D8)] bg-colors-base-default"
            >
                <div className="flex gap-3">
                    <img
                        loading="lazy"
                        src="/images/devicon_google.svg"
                        className="w-6 aspect-square"
                    />
                    <div>Google</div>
                </div>
            </Button>
            <div className="flex gap-2 justify-between px-11 mt-8 text-sm leading-5 whitespace-nowrap">
                <div className="grow text-black">Don’t have an account?</div>
                <a href="/signup" className="text-red-600">Sign up</a>
            </div>
        </form>
    );
}

export default LoginForm;

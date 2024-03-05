import React, { useState } from "react";

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
        <form className="flex flex-col px-5 max-w-[300px]" onSubmit={handleSubmit}>
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
            <div className="justify-center items-start py-5 pr-16 pl-3.5 mt-8 w-full text-sm font-medium leading-5 whitespace-nowrap rounded-2xl border-2 border-solid shadow-sm bg-white bg-opacity-0 border-[color:var(--Semantic-light-layout-content3,#E4E4E7)] text-zinc-500">
                <label htmlFor="email"></label>
                <div>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="justify-center items-start py-5 pr-16 pl-3.5 mt-8 w-full text-sm font-medium leading-5 whitespace-nowrap rounded-2xl border-2 border-solid shadow-sm bg-white bg-opacity-0 border-[color:var(--Semantic-light-layout-content3,#E4E4E7)] text-zinc-500">
                <label htmlFor="email"></label>
                <div>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleEmailChange}
                        className="w-full"
                    />
                </div>
            </div>

            <a href="ForgotPassword" className="self-end mt-2 text-sm leading-5 text-red-600 whitespace-nowrap">
                Forgot Password?
            </a>
            <a
                href="home"
                className="justify-center text-center items-center px-16 py-2 mt-10 w-full text-base font-medium leading-6 text-white whitespace-nowrap bg-red-600 rounded-xl"
            >
                Login 
            </a>
            <div className="flex gap-1 justify-center items-center mt-4 text-xs leading-4 text-zinc-500">
                <div className="self-stretch my-auto h-px bg-neutral-900 bg-opacity-10 w-[108px]" />
                <div className="self-stretch text-center">or login using</div>
                <div className="self-stretch my-auto h-px bg-neutral-900 bg-opacity-10 w-[108px]" />
            </div>
            <a
                href="somewhere"
                className="flex justify-center items-center px-16 py-2 mt-4 w-full text-base font-medium leading-6 text-black whitespace-nowrap rounded-xl border-2 border-solid border-[color:var(--colors-base-default,#D4D4D8)]"
            >
                <div className="flex gap-3">
                    <img
                        loading="lazy"
                        src="/images/devicon_google.svg"
                        className="w-6 aspect-square"
                    />
                    <div>Google</div>
                </div>
            </a>
            <div className="flex gap-2 justify-between px-11 mt-8 text-sm leading-5 whitespace-nowrap">
                <div className="grow text-black">Don’t have an account?</div>
                <a href="/signup" className="text-red-600">Sign up</a>
            </div>
        </form>
    );
}

export default LoginForm;

import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import LogoLargeIcon from "../../components/svgs/LogoLargeIcon";
import GoogleButton from "../../components/GoogleButton";
import DividerText from "../../components/DividerText";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/utils/helpers/userHelper";

interface LoginFormProps {
  onResetPress: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onResetPress }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setLoading(true);
    // Check if email or password is blank
    if (email === "" || password === "") {
      setError("Please enter both email and password.");
      return;
    }

    const loginResult = await loginUser(email, password);
    if (loginResult.message === "success") {
      // Redirect to "/" after successful login
      router.push("/");
      console.log("Login successful");
    } else {
      // Handle failed login, such as displaying an error message
      setError("Incorrect Credentials, please input them again.");
      console.error("Login failed");
    }
    setLoading(false);
  };

  return (
    <form className="flex max-w-[500px] flex-col px-5" onSubmit={handleSubmit}>
      <div className="flex w-full justify-center">
        <LogoLargeIcon />
      </div>

      <div />
      {error !== "" && <div className="text-red-500">{error}</div>}
      <div className="mt-10 w-full text-center text-xl font-semibold leading-7 text-black">
        Welcome back!
      </div>
      <div className="w-full text-center text-zinc-500">
        Login to continue booking or listing
      </div>
      <div className="mt-8 flex max-w-[500px] flex-col">
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

      <div className="mt-2 flex max-w-[500px] flex-col">
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

      <p
        className="mt-2 cursor-pointer self-end whitespace-nowrap text-sm leading-5 text-primary-600"
        onClick={onResetPress}
      >
        Forgot Password?
      </p>
      <Button
        className="mt-10 w-full items-center justify-center whitespace-nowrap rounded-xl bg-primary-600 px-16 py-2 text-center text-base font-medium leading-6 text-white"
        type="submit"
        isDisabled={isLoading}
      >
        Login
      </Button>
      <DividerText>or login using</DividerText>
      <GoogleButton />
      <div className="mt-8 flex justify-between gap-2 whitespace-nowrap px-11 text-sm">
        <div className="text-black">Don’t have an account?</div>
        <Link href="/signup" className="text-primary">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;

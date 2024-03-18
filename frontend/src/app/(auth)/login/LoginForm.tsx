import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import GoogleButton from "../../components/GoogleButton";
import DividerText from "../../components/DividerText";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/utils/helpers/userHelper";
import WarningIcon from "@/app/components/svgs/WarnIcon";

interface LoginFormProps {
  onResetPress: () => void;
  googleButton: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onResetPress,
  googleButton
}) => {
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
    } else {
      // Handle failed login, such as displaying an error message
      setError("Incorrect Credentials, please input them again.");
      console.error("Login failed");
    }
    setLoading(false);
  };

  return (
    <form className="flex w-96 flex-col px-5" onSubmit={handleSubmit}>
      {error !== "" && (
        <div className="mt-8 h-20 w-full rounded-xl border border-2 border-danger-500 bg-danger-50 p-2 text-danger-500">
          <div className="flex flex-row">
            <div className="p-2">
              <WarningIcon />
            </div>
            <div className="flex flex-col p-2 text-xs">
              <span className="font-bold">Invalid Credentials</span>
              <span>Make sure you entered the correct email and password</span>
            </div>
          </div>
        </div>
      )}
      <div className="mt-8 flex flex-col">
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

      <div className="mt-2 flex w-full flex-col">
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
      <GoogleButton onPress={googleButton} />
      <div className="mt-8 flex justify-center px-11 text-sm leading-5">
        <div className="mr-2 text-black">Don’t have an account?</div>
        <Link href="/signup" className="text-primary-600">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;

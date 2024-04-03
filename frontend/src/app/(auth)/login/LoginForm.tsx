import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import GoogleButton from "../../components/GoogleButton";
import DividerText from "../../components/DividerText";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/utils/helpers/userHelper";
import ErrorMessage from "@/app/components/ErrorMessage";

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
    if (email === "" || password === "") {
      setError("Please enter both email and password.");
      return;
    }

    const loginResult = await loginUser(email, password);
    if (loginResult.message === "success") {
      router.push("/");
    } else {
      setError("Incorrect Credentials, please input them again.");
      console.error("Login failed");
    }
    setLoading(false);
  };

  return (
    <form className="flex w-96 flex-col px-5" onSubmit={handleSubmit}>
      {error !== "" && (
        <ErrorMessage
          header="Invalid Credentials"
          message="Make sure you entered the correct email and password"
        />
      )}
      <div className="mt-2 flex flex-col">
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

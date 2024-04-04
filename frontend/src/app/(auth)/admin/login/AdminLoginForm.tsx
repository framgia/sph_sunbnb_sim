"use client";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import ErrorMessage from "@/app/components/ErrorMessage";

const AdminLoginForm = () => {
  // to be modified on integration, commented to avoid lint errors
  // const router = useRouter();
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

    // to be modified on integration, commented to avoid lint errors

    // const loginResult = await loginUser(email, password);
    // if (loginResult.message === "success") {
    //   router.push("/");
    // } else {
    //   setError("Incorrect Credentials, please input them again.");
    //   console.error("Login failed");
    // }
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
      <Button
        className="mt-10 w-full items-center justify-center whitespace-nowrap rounded-xl bg-primary-600 px-16 py-2 text-center text-base font-medium leading-6 text-white"
        type="submit"
        isDisabled={isLoading}
      >
        Login
      </Button>
    </form>
  );
};

export default AdminLoginForm;

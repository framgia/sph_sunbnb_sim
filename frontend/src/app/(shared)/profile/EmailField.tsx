"use client";
import type { ProfileFieldProps } from "@/app/interfaces/ProfileFieldProps";
import { updateUser } from "@/app/utils/helpers/userHelper";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useState } from "react";

const EmailField: React.FC<
  ProfileFieldProps & { showUpdateButton: boolean }
> = ({ user, onEdit, onCancel, enabled, showUpdateButton }) => {
  const [isEditing, setEditing] = useState(false);
  const [isEmailInvalid, setEmailInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState(
    user?.email !== undefined ? user.email : ""
  );
  const [isLoading, setLoading] = useState(false);

  const handleUpdate = async (): Promise<void> => {
    setLoading(true);
    try {
      const updatedUser = { ...user, email };

      const result = await updateUser(user?.id, updatedUser);

      if (result.message === "success") {
        user.email = email;
        onCancel();
        setEditing(false);
      } else {
        setErrorMessage(result.message);
        setEmailInvalid(true);
      }
    } catch (error) {
      console.error("Unexpected error during update:", error);
    }
    setLoading(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setErrorMessage("");
    setEmailInvalid(false);
  };

  return (
    <div className="flex w-full flex-col">
      {isEditing && enabled ? (
        <div className="flex w-full flex-col pl-5">
          <span className="text-sm font-medium leading-5">Email Address</span>
          <span className="mb-5 text-sm font-normal leading-5 text-zinc-500">
            Use an address you&apos;ll always have access to.
          </span>
          <div className="flex w-2/4 flex-row">
            <Input
              className="mr-5 text-zinc-500"
              value={email}
              onChange={handleEmailChange}
              variant="bordered"
              placeholder="Email"
              isInvalid={isEmailInvalid}
              errorMessage={errorMessage}
            />
          </div>
          <div className="my-5 flex flex-row">
            <Button
              size="sm"
              variant="flat"
              color="default"
              className="mr-2 font-semibold"
              onPress={() => {
                setEmail(user?.email);
                setEmailInvalid(false);
                setErrorMessage("");
                onCancel();
                setEditing(false);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="solid"
              className="bg-primary-600 text-white"
              onPress={handleUpdate}
              isDisabled={isLoading}
            >
              Update
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-col pl-5">
            <span
              className={
                "text-sm font-medium leading-5 " +
                (enabled ? "" : " text-foreground-300")
              }
            >
              Email Address
            </span>
            <span
              className={
                "mb-5 text-base font-normal leading-6 " +
                /* eslint-disable multiline-ternary */
                (enabled ? " text-zinc-500" : " text-foreground-300")
              }
            >
              {user?.email}
            </span>
          </div>
          {showUpdateButton && (
            <Button
              variant={enabled ? "flat" : "bordered"}
              size="sm"
              color="default"
              className={
                "font-semibold " + (enabled ? "" : "text-foreground-300")
              }
              onPress={() => {
                onEdit();
                setEditing(true);
              }}
              disabled={!enabled}
            >
              Update
            </Button>
          )}
        </div>
      )}
      <Divider />
    </div>
  );
};

export default EmailField;

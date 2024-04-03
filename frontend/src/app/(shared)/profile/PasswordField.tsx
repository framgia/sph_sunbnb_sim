import type { ProfileFieldProps } from "@/app/interfaces/ProfileFieldProps";
import { updatePassword } from "@/app/utils/helpers/userHelper";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useState } from "react";

const PasswordField: React.FC<ProfileFieldProps> = ({
  user,
  enabled,
  onCancel,
  onEdit
}) => {
  const [isEditing, setEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleUpdate = async (): Promise<void> => {
    setLoading(true);
    try {
      if (
        currentPassword === "" ||
        newPassword === "" ||
        confirmNewPassword === ""
      ) {
        if (currentPassword === "") {
          setPasswordError("The current password field is required.");
        }
        if (newPassword === "") {
          setNewPasswordError("The new password field is required.");
        }
        if (confirmNewPassword === "") {
          setConfirmNewPasswordError(
            "The password confirmation field is required."
          );
        }
        return;
      }

      if (newPassword !== confirmNewPassword) {
        setConfirmNewPasswordError("Passwords do not match");
        return;
      }
      const passwordUpdate = {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmNewPassword
      };

      const result = await updatePassword(user?.id, passwordUpdate);

      if (result.message !== "success") {
        if (result.message === "Current password is incorrect.") {
          setPasswordError(result.message);
        } else if (result.errors !== undefined) {
          if (result.errors.current_password !== undefined) {
            setPasswordError(result.errors.current_password[0]);
          }
          if (result.errors.new_password !== undefined) {
            setNewPasswordError(result.errors.new_password[0]);
          }
          if (result.errors.new_password_confirmation !== undefined) {
            setConfirmNewPasswordError(
              result.errors.new_password_confirmation[0]
            );
          }
        }
      } else {
        onCancel();
        setEditing(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setPasswordError("");
        setNewPasswordError("");
        setConfirmNewPasswordError("");
        user.updated_at = new Date().toISOString();
      }
    } catch (error) {
      console.error("Unexpected error during update:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCurrentPassword(e.target.value);
    setPasswordError("");
  };

  const handleNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewPassword(e.target.value);
    setNewPasswordError("");
  };

  const handleConfirmNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setConfirmNewPassword(e.target.value);
    setConfirmNewPasswordError("");
  };

  return (
    <div className="flex w-full flex-col">
      {isEditing && enabled ? (
        <div className="flex w-full flex-col pl-5">
          <span className="text-sm font-medium leading-5">Password</span>
          <span className="mb-5 text-sm font-normal leading-5 text-zinc-500">
            Choose a unique and secure password to keep your account safe.
          </span>
          <div className="flex w-2/4 flex-col">
            <Input
              className="mb-5 text-zinc-500"
              variant="bordered"
              placeholder="Current Password"
              type="password"
              value={currentPassword}
              isInvalid={passwordError !== ""}
              errorMessage={passwordError}
              onChange={handleCurrentPasswordChange}
            />
            <Input
              className="mb-5 text-zinc-500"
              variant="bordered"
              placeholder="New Password"
              type="password"
              isInvalid={newPasswordError !== ""}
              errorMessage={newPasswordError}
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <Input
              className="text-zinc-500"
              variant="bordered"
              placeholder="Confirm New Password"
              type="password"
              isInvalid={confirmNewPasswordError !== ""}
              errorMessage={confirmNewPasswordError}
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
            />
          </div>
          <div className="my-5 flex flex-row">
            <Button
              size="sm"
              variant="flat"
              color="default"
              className="mr-2 font-semibold"
              onPress={() => {
                onCancel();
                setEditing(false);
                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
                setPasswordError("");
                setNewPasswordError("");
                setConfirmNewPasswordError("");
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="solid"
              className="bg-primary-600 text-white"
              onPress={handleUpdate}
              isDisabled={
                isLoading ||
                newPasswordError !== "" ||
                confirmNewPasswordError !== "" ||
                passwordError !== ""
              }
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
              Password
            </span>
            <span
              className={
                "mb-5 text-base font-normal leading-6 " +
                (enabled ? " text-zinc-500" : " text-foreground-300")
              }
            >
              Last updated on{" "}
              {new Date(user?.updated_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </span>
          </div>
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
        </div>
      )}
      <Divider />
    </div>
  );
};

export default PasswordField;

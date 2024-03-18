"use client";
import type { ProfileFieldProps } from "@/app/interfaces/ProfileFieldProps";
import { updateUser } from "@/app/utils/helpers/userHelper";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useState } from "react";

const LegalNameField: React.FC<ProfileFieldProps> = ({
  user,
  onEdit,
  onCancel,
  enabled
}) => {
  const [isEditing, setEditing] = useState(false);
  const [originalFirstName, setOriginalFirstName] = useState("");
  const [originalLastName, setOriginalLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [firstName, setFirstName] = useState(
    user?.first_name !== undefined ? user.first_name : ""
  );
  const [lastName, setLastName] = useState(
    user?.last_name !== undefined ? user.last_name : ""
  );

  const handleEdit = (): void => {
    setOriginalFirstName(firstName);
    setOriginalLastName(lastName);
    onEdit();
    setEditing(true);
  };

  const handleCancel = (): void => {
    setFirstName(originalFirstName);
    setLastName(originalLastName);
    onCancel();
    setEditing(false);
    setFirstNameError("");
    setLastNameError("");
  };

  const handleUpdate = async (): Promise<void> => {
    try {
      if (firstName === "" || lastName === "") {
        if (firstName === "") {
          setFirstNameError("The first name field is required.");
        }
        if (lastName === "") {
          setLastNameError("The last name field is required.");
        }
        return;
      }

      const updatedUser = {
        ...user,
        first_name: firstName,
        last_name: lastName
      };

      const result = await updateUser(user?.id, updatedUser);

      if (result.message === "success") {
        user.first_name = firstName;
        user.last_name = lastName;
        onCancel();
        setEditing(false);
      } else {
        setFirstNameError("");
        setLastNameError("");

        if (result.errors !== undefined) {
          if (result.errors.first_name !== undefined) {
            setFirstNameError(result.errors.first_name[0]);
          }
          if (result.errors.last_name !== undefined) {
            setLastNameError(result.errors.last_name[0]);
          }
        }
      }
    } catch (error) {
      console.error("Unexpected error during update:", error);
    }
  };

  const handleFirstNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };

  const handleLastNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setLastName(e.target.value);
    setLastNameError("");
  };

  return (
    <div className="flex w-full flex-col">
      {isEditing && enabled ? (
        <>
          <div className="flex w-full flex-col pl-5">
            <span className="text-sm font-medium leading-5">Legal Name</span>
            <span className="mb-5 text-sm font-normal leading-5 text-zinc-500">
              This is the name on your travel document, which could be a license
              or a passport.
            </span>
            <div className="flex w-2/4 flex-row">
              <Input
                className="mr-5 text-zinc-500"
                value={firstName}
                onChange={handleFirstNameChange}
                variant="bordered"
                placeholder="First Name"
                isInvalid={firstNameError.length > 0}
                errorMessage={firstNameError}
              />
              <Input
                variant="bordered"
                className="text-zinc-500"
                value={lastName}
                onChange={handleLastNameChange}
                placeholder="Last Name"
                isInvalid={lastNameError.length > 0}
                errorMessage={lastNameError}
              />
            </div>
            <div className="my-5 flex flex-row">
              <Button
                size="sm"
                variant="flat"
                color="default"
                className="mr-2 font-semibold"
                onPress={handleCancel}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="solid"
                className="bg-primary-600 text-white"
                onPress={handleUpdate}
              >
                Save
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-col pl-5">
            <span
              className={
                "text-sm font-medium leading-5 " +
                (enabled ? "" : " text-foreground-300")
              }
            >
              Legal Name
            </span>
            <span
              className={
                "mb-5 text-base font-normal leading-6 " +
                /* eslint-disable multiline-ternary */
                (enabled ? " text-zinc-500" : " text-foreground-300")
              }
            >
              {firstName} {lastName}
            </span>
          </div>
          <Button
            variant={enabled ? "flat" : "bordered"}
            size="sm"
            color="default"
            className={
              "font-semibold " + (enabled ? "" : "text-foreground-300")
            }
            onPress={handleEdit}
            disabled={!enabled}
          >
            Edit
          </Button>
        </div>
      )}
      <Divider />
    </div>
  );
};

export default LegalNameField;

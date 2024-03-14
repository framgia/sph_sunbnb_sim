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
  // const { first_name, last_name } = user || { first_name: "", last_name: "" };

  const [firstName, setFirstName] = useState(
    user?.first_name !== undefined ? user.first_name : ""
  );
  const [lastName, setLastName] = useState(
    user?.last_name !== undefined ? user.last_name : ""
  );

  const handleUpdate = async (): Promise<void> => {
    try {
      const updatedUser = {
        ...user,
        first_name: firstName,
        last_name: lastName
      };

      const result = await updateUser(user?.id, updatedUser);

      if (result.message === "success") {
        onCancel();
        setEditing(false);
      } else {
        console.error("Update failed:", result.message);
      }
    } catch (error) {
      console.error("Unexpected error during update:", error);
    }
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
                // defaultValue={firstName}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                variant="bordered"
                placeholder="First Name"
              />
              <Input
                variant="bordered"
                className="text-zinc-500"
                // defaultValue={lastName}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Last Name"
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
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="solid"
                className="bg-primary-600 text-white"
                // onPress={() => {
                //   onCancel();
                //   setEditing(false);
                // }}
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
            onPress={() => {
              onEdit();
              setEditing(true);
            }}
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

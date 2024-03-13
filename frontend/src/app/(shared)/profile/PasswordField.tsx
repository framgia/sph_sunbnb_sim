import type { ProfileFieldProps } from "@/app/interfaces/ProfileFieldProps";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useState } from "react";

const PasswordField: React.FC<ProfileFieldProps> = ({
  enabled,
  onCancel,
  onEdit
}) => {
  const [isEditing, setEditing] = useState(false);
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
            />
            <Input
              className="mb-5 text-zinc-500"
              variant="bordered"
              placeholder="New Password"
            />
            <Input
              className="text-zinc-500"
              variant="bordered"
              placeholder="Confirm New Password"
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
              onPress={() => {
                onCancel();
                setEditing(false);
              }}
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
                /* eslint-disable multiline-ternary */
                (enabled ? " text-zinc-500" : " text-foreground-300")
              }
            >
              Last updated on March 7, 2024
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

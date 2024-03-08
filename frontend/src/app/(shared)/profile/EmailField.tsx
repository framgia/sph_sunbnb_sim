"use client";
import type { ProfileFieldProps } from "@/app/interfaces/ProfileFieldProps";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useState } from "react";

interface EmailFieldProps extends ProfileFieldProps {
    email: string;
}

const EmailField: React.FC<EmailFieldProps> = ({
    email,
    onEdit,
    onUpdate,
    onCancel,
    enabled
}) => {
    const [isEditing, setEditing] = useState(false);
    return (
        <div className="flex w-full flex-col">
            {isEditing && enabled ? (
                <div className="flex w-full flex-col pl-5">
                    <span className="text-sm font-medium leading-5">
                        Email Address
                    </span>
                    <span className="mb-5 text-sm font-normal leading-5 text-zinc-500">
                        Use an address you&apos;ll always have access to.
                    </span>
                    <div className="flex w-2/4 flex-row">
                        <Input
                            className="mr-5 text-zinc-500"
                            defaultValue={email}
                            variant="bordered"
                            placeholder="Email"
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
                            Email Address
                        </span>
                        <span
                            className={
                                "mb-5 text-base font-normal leading-6 " +
                                /* eslint-disable multiline-ternary */
                                (enabled
                                    ? " text-zinc-500"
                                    : " text-foreground-300")
                            }
                        >
                            {email}
                        </span>
                    </div>
                    <Button
                        variant={enabled ? "flat" : "bordered"}
                        size="sm"
                        color="default"
                        className={
                            "font-semibold " +
                            (enabled ? "" : "text-foreground-300")
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

export default EmailField;
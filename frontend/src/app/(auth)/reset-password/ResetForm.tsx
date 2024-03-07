import React from "react";
import { Button, Input } from "@nextui-org/react";

interface ResetPasswordFormProps {
    handleSubmit: (event: React.FormEvent) => void;
}
const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
    handleSubmit
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-10">
                <Input
                    variant="bordered"
                    className="mb-2"
                    placeholder="New password"
                    required
                />
                <Input
                    variant="bordered"
                    className="mb-2"
                    placeholder="Confirm new password"
                    required
                />
            </div>
            <Button className="w-full bg-primary-600 text-white" type="submit">
                Reset
            </Button>
        </form>
    );
};

export default ResetPasswordForm;

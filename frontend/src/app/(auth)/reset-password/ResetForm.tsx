import React from "react";
import { Button, Input } from "@nextui-org/react";

interface ResetPasswordFormProps {
  handleSubmit: (event: React.FormEvent) => void;
  data: Record<string, string>;
  setData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  error: Record<string, string | boolean>;
  loading: boolean;
}
const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  handleSubmit,
  data,
  setData,
  error,
  loading
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-10">
        <Input
          type="password"
          variant="bordered"
          className="mb-2"
          placeholder="New password"
          isInvalid={error.hasError as boolean}
          value={data.password}
          onChange={(e) => {
            setData((prevData) => ({ ...prevData, password: e.target.value }));
          }}
          required
        />
        <Input
          type="password"
          variant="bordered"
          className="mb-2"
          isInvalid={error.hasError as boolean}
          errorMessage={error.message as string}
          placeholder="Confirm new password"
          value={data.password_confirmation}
          onChange={(e) => {
            setData((prevData) => ({
              ...prevData,
              password_confirmation: e.target.value
            }));
          }}
          required
        />
      </div>
      <Button
        className="w-full bg-primary-600 text-white"
        type="submit"
        isDisabled={loading}
        isLoading={loading}
      >
        Reset
      </Button>
    </form>
  );
};

export default ResetPasswordForm;

import { Accommodation } from "@/app/interfaces/AccomodationData";
import { Input, Textarea } from "@nextui-org/react";
import React from "react";

interface DetailFormProps {
  data: Accommodation;
  setData: React.Dispatch<React.SetStateAction<Accommodation>>;
  error: Record<string, string | boolean>;
}

const DetailForm: React.FC<DetailFormProps> = ({ data, setData, error }) => {
  return (
    <>
      <div className="mt-6 w-full text-left text-lg font-semibold leading-7 text-black max-md:max-w-full">
        Tell us about your place
      </div>
      <Input
        aria-label="Name"
        type="text"
        className="mt-4"
        label="Title"
        variant="bordered"
        isInvalid={error.hasError === true && data.name.trim() === ""}
        value={data.name}
        onChange={(e) => {
          setData({ ...data, name: e.target.value });
        }}
      />
      <Textarea
        aria-label="Description"
        label="Description"
        className="mt-4"
        maxRows={5}
        minRows={5}
        variant="bordered"
        isInvalid={error.hasError === true && data.description.trim() === ""}
        value={data.description}
        onChange={(e) => {
          setData({ ...data, description: e.target.value });
        }}
      />
    </>
  );
};

export default DetailForm;

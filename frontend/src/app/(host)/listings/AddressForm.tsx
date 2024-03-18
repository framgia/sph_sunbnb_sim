import type { Accommodation } from "@/app/interfaces/AccomodationData";
import { Input } from "@nextui-org/react";
import React from "react";

interface AddressFormProps {
  data: Accommodation;
  setData: React.Dispatch<React.SetStateAction<Accommodation>>;
  error: Record<string, string | boolean>;
}

const AddressForm: React.FC<AddressFormProps> = ({ data, setData, error }) => {
  return (
    <>
      <div className="mt-4 w-full text-left text-sm font-semibold leading-7 text-black max-md:max-w-full">
        Address
      </div>

      <Input
        aria-label="Province"
        type="text"
        className="mt-4"
        label="Province"
        variant="bordered"
        isInvalid={error.hasError === true && data.province.trim() === ""}
        value={data.province}
        onChange={(e) => {
          setData({ ...data, province: e.target.value });
        }}
      />
      <div className="mt-2 flex w-full justify-between gap-5 whitespace-nowrap text-base leading-6 text-zinc-500 max-md:max-w-full max-md:flex-wrap">
        <Input
          aria-label="Street"
          type="text"
          className="mt-4"
          label="Street"
          variant="bordered"
          isInvalid={error.hasError === true && data.street.trim() === ""}
          value={data.street}
          onChange={(e) => {
            setData({ ...data, street: e.target.value });
          }}
        />
        <Input
          aria-label="Barangay"
          type="text"
          className="mt-4"
          label="Barangay"
          variant="bordered"
          isInvalid={error.hasError === true && data.barangay.trim() === ""}
          value={data.barangay}
          onChange={(e) => {
            setData({ ...data, barangay: e.target.value });
          }}
        />
      </div>
      <div className="mt-2 flex w-full justify-between gap-5 whitespace-nowrap text-base leading-6 text-zinc-500 max-md:max-w-full max-md:flex-wrap">
        <Input
          aria-label="City"
          type="text"
          className="mt-4"
          label="City"
          variant="bordered"
          isInvalid={error.hasError === true && data.city.trim() === ""}
          value={data.city}
          onChange={(e) => {
            setData({ ...data, city: e.target.value });
          }}
        />
        <Input
          pattern="[0-9]*"
          aria-label="Zip Code"
          type="text"
          className="mt-4"
          label="Zip Code"
          variant="bordered"
          isInvalid={error.hasError === true && data.zip_code < 1}
          value={
            data.zip_code.toString() === "0" ? "" : data.zip_code.toString()
          }
          onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue === "0" || inputValue === "") {
              setData({ ...data, zip_code: 0 });
            } else if (!isNaN(parseInt(inputValue)) && inputValue.length <= 4) {
              setData({ ...data, zip_code: parseInt(inputValue) });
            }
          }}
        />
      </div>
    </>
  );
};

export default AddressForm;

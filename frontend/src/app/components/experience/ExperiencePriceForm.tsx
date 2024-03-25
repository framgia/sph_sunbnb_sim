import { Experience } from "@/app/interfaces/ExperienceData";
import { Input } from "@nextui-org/react";
import React from "react";

interface PriceFormProps {
  data: Experience;
  setData: React.Dispatch<React.SetStateAction<Experience>>;
  error: Record<string, string | boolean>;
}

const ExperiencePriceForm: React.FC<PriceFormProps> = ({
  data,
  setData,
  error
}) => {
  return (
    <>
      <div className="mw-full mt-10 text-left text-sm font-semibold leading-5 text-black max-md:max-w-full ">
        Set your price
      </div>
      <div>
        <Input
          aria-label="Price"
          type="number"
          className="mt-4"
          startContent="₱"
          variant="bordered"
          placeholder="0"
          isInvalid={error.hasError === true && data.price < 1}
          value={data.price.toString() === "0" ? "" : data.price.toString()}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue === "0" || inputValue === "") {
              setData({ ...data, price: 0 });
            } else if (!isNaN(parseInt(inputValue))) {
              setData({ ...data, price: parseInt(inputValue) });
            }
          }}
        />
      </div>
    </>
  );
};

export default ExperiencePriceForm;

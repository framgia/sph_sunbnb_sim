import type { Accommodation } from "@/app/interfaces/AccomodationData";
import { Input } from "@nextui-org/react";
import React from "react";

interface PriceFormProps {
  data: Accommodation;
  setData: React.Dispatch<React.SetStateAction<Accommodation>>;
  error: Record<string, string | boolean>;
}

const PriceForm: React.FC<PriceFormProps> = ({ data, setData, error }) => {
  return (
    <>
      <div className="mw-full mt-10 text-left text-sm font-semibold leading-5 text-black max-md:max-w-full ">
        Set your price
      </div>
      <div className="mb-2">
        <Input
          aria-label="Price"
          type="number"
          className="mt-4"
          startContent="₱"
          variant="bordered"
          placeholder="0.00"
          isInvalid={error.hasError === true && data.price < 1}
          value={data.price.toString() === "0" ? "" : data.price.toString()}
          onChange={(e) => {
            const inputValue = parseFloat(e.target.value);
            if (!isNaN(inputValue)) {
              setData({ ...data, price: inputValue });
            } else {
              setData({ ...data, price: 0 });
            }
          }}
        />
      </div>
    </>
  );
};

export default PriceForm;

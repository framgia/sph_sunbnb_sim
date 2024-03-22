"use client";
import React from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import InclusionsListbox from "@/app/components/experiences/InclusionsListbox";
import LanguagesListbox from "@/app/components/experiences/LanguagesListbox";
import { Experience } from "@/app/interfaces/ExperienceData";

interface NewExperienceFormProps {
  onPress: () => void;
  data: Experience;
  setData: React.Dispatch<React.SetStateAction<Experience>>;
  loading: boolean;
  error: Record<string, string | boolean>;
}

const NewExperienceForm: React.FC<NewExperienceFormProps> = ({
  onPress,
  data,
  setData,
  loading,
  error
}) => {
  const experienceOptions = [
    { value: "Food & Drinks", label: "Food & Drinks" },
    { value: "Art & Culture", label: "Art & Culture" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Tours", label: "Tours" },
    { value: "Sports", label: "Sports" }
  ];

  return (
    <section className="flex w-full flex-col px-5">
      <header className="w-full text-left text-lg font-semibold leading-7 text-black max-md:max-w-full">
        List Experience
      </header>
      <Input
        aria-label="Name"
        type="text"
        className="mt-4"
        label="Title"
        variant="bordered"
        isInvalid={error.hasError === true && data.description.trim() === ""}
        value={data.name}
        onChange={(e) => {
          setData({ ...data, name: e.target.value });
        }}
      />
      <Select className="mt-4" label="Experience Type" variant="bordered">
        {experienceOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      <Textarea
        aria-label="Description"
        label="Description"
        className="mt-4"
        maxRows={5}
        minRows={5}
        variant="bordered"
        onChange={(e) => {
          setData({ ...data, description: e.target.value });
        }}
      />
      <div className="mt-5 w-full text-left text-lg font-semibold leading-7 text-black max-md:max-w-full">
        Address
      </div>
      <Input
        aria-label="Province"
        type="text"
        className="mt-4"
        label="Province"
        variant="bordered"
        isInvalid={error.hasError === true && data.description.trim() === ""}
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
          isInvalid={error.hasError === true && data.description.trim() === ""}
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
          isInvalid={error.hasError === true && data.description.trim() === ""}
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
          isInvalid={error.hasError === true && data.description.trim() === ""}
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
      <div className="mt-5 rounded-lg border-[1.3px] border-solid border-[color:var(--Blues-Gray2,#B8BBC2)] p-10">
        <div className="mb-10 mt-10 grid grid-cols-2">
          <div className="font-semibold">
            Inclusions
            <InclusionsListbox />
          </div>

          <div className="w-full text-left text-sm font-semibold leading-5 text-black max-md:max-w-full">
            More Details
            <div className="mt-5 grid grid-cols-2 gap-2 font-light">
              <div>
                Start Time
                <Input width="186px" type="time" className="mt-5" />
              </div>
              <div>
                End Time
                <Input width="186px" type="time" className="mt-5" />
              </div>
            </div>
            <div className="mt-5">
              I speak...
              <LanguagesListbox />
            </div>
          </div>
          {/* media section */}
        </div>
      </div>
      <div className="mt-10 w-full text-left text-lg font-semibold leading-5 text-black max-md:max-w-full">
        Upload photos of your place
      </div>
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
        />
      </div>
      <div className="mt-16 flex gap-5 self-end whitespace-nowrap text-sm leading-5">
        <Button
          className="grow justify-center rounded-lg bg-primary-600 px-7 py-2.5 font-bold text-white drop-shadow-sm max-md:px-5"
          onPress={onPress}
        >
          Publish
        </Button>
      </div>
    </section>
  );
};

export default NewExperienceForm;

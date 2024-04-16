"use client";
import React from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

import ListingUploader from "@/app/components/accommodation/ListingUploader";
import AccommodationImage from "../../accommodations/new/ImageCollection";

import { ExperienceType } from "@/app/utils/enums";

import ErrorMessage from "@/app/components/ErrorMessage";
import InclusionsListbox from "@/app/components/experience/InclusionsListbox";
import LanguagesListbox from "@/app/components/experience/LanguagesListbox";
import type { ExperienceData } from "@/app/interfaces/ExperienceData";
import ExperienceAddressForm from "@/app/components/experience/ExperienceAddressForm";
import ExperiencePriceForm from "@/app/components/experience/ExperiencePriceForm";
import { useRouter } from "next/navigation";

interface NewExperienceFormProps {
  onPress: () => void;
  data: ExperienceData;
  setData: React.Dispatch<React.SetStateAction<ExperienceData>>;
  loading: boolean;
  error: Record<string, string | boolean>;
  media: string[];
  setMedia: React.Dispatch<React.SetStateAction<string[]>>;
}

const NewExperienceForm: React.FC<NewExperienceFormProps> = ({
  onPress,
  data,
  setData,
  loading,
  media,
  setMedia,
  error
}) => {
  const router = useRouter();
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
      <Select
        className="mt-4"
        label="Select Experience Type"
        variant="bordered"
        defaultSelectedKeys={data.type !== "" ? [data.type] : []}
        onChange={(e) => {
          setData({ ...data, type: e.target.value });
        }}
      >
        {Object.values(ExperienceType).map((type) => (
          <SelectItem key={type} value={type} aria-label="Experience Type Item">
            {type}
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
      <ExperienceAddressForm data={data} setData={setData} error={error} />
      <hr className="mt-12 min-h-[3px] w-full bg-zinc-200 max-md:mt-10 max-md:max-w-full" />

      <div className="mt-5 rounded-lg border-[1.3px] border-solid border-[color:var(--Blues-Gray2,#B8BBC2)]  p-5 md:p-10">
        <div className="m-3 grid md:my-10 md:grid-cols-2">
          <div className="font-semibold">
            Inclusions
            <InclusionsListbox setData={setData} data={data} />
          </div>

          <div className="w-full text-left text-sm font-semibold leading-5 text-black max-md:max-w-full">
            More Details
            <div className="mt-5 grid gap-2 font-light md:grid-cols-2">
              <div className="flex flex-row items-center justify-center  md:flex-col">
                <div className="flex w-full text-left">Start Time</div>
                <Input
                  width="186px"
                  type="time"
                  className="m-2"
                  onChange={(e) => {
                    setData({ ...data, start_time: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-row items-center justify-center  md:flex-col">
                <div className="flex w-full text-left">End Time</div>
                <Input
                  width="186px"
                  type="time"
                  className="mt-2"
                  onChange={(e) => {
                    setData({ ...data, end_time: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="mt-5">
              I speak...
              <LanguagesListbox data={data} setData={setData} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 w-full text-left text-lg font-semibold leading-5 text-black max-md:max-w-full">
        Upload photos of your place
      </div>
      <div className="mt-2 rounded-3xl outline outline-1 outline-neutral-300 md:grid md:grid-cols-2">
        <div className="m-8 rounded-3xl bg-primary-50  outline outline-1 outline-neutral-300">
          <ListingUploader media={media} setMedia={setMedia} />
          <div className="pb-3 text-center text-xs">Maximum of 5 photos</div>
        </div>
        <div className="m-8 rounded-3xl bg-primary-50 outline outline-1 outline-neutral-300">
          <AccommodationImage media={media} setMedia={setMedia} />
        </div>
      </div>
      <ExperiencePriceForm data={data} setData={setData} error={error} />
      <div>
        {error.hasError === true && (
          <ErrorMessage message={error.message as string} />
        )}
      </div>
      <div className="mt-16 flex gap-5 self-end whitespace-nowrap text-sm leading-5">
        <Button
          isDisabled={loading}
          className="grow justify-center rounded-lg bg-zinc-200 px-7 py-2.5 text-black max-md:px-5"
          onPress={() => {
            router.back();
          }}
        >
          Cancel
        </Button>
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

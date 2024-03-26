"use client";
import ListingUploader from "@/app/components/accommodation/ListingUploader";
import ExperienceAddressForm from "@/app/components/experience/ExperienceAddressForm";
import type { Experience, MediaUpdate } from "@/app/interfaces/ExperienceData";
import { ExperienceType } from "@/app/utils/enums";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React from "react";
import AccommodationImageUpdate from "../../../accommodations/[id]/edit/ImageCollectionUpdate";
import ErrorMessage from "@/app/components/ErrorMessage";
import TrashIcon from "@/app/components/svgs/TrashIcon";
import Link from "next/link";
import InclusionsListbox from "@/app/components/experience/InclusionsListbox";
import ExperiencePriceForm from "@/app/components/experience/ExperiencePriceForm";
import LanguagesListbox from "@/app/components/experience/LanguagesListbox";

interface EditListingProps {
  onDelete: () => void;
  listingid: string;
  data: Experience;
  setData: React.Dispatch<React.SetStateAction<Experience>>;
  media: MediaUpdate;
  setMedia: React.Dispatch<React.SetStateAction<MediaUpdate>>;
  error: Record<string, string | boolean>;
  loading: boolean;
  onPress: () => void;
}

const EditExperienceForm: React.FC<EditListingProps> = ({
  onDelete,
  listingid,
  data,
  setData,
  media,
  setMedia,
  error,
  loading,
  onPress
}) => {
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
        isInvalid={error.hasError === true && data.name.trim() === ""}
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
        isInvalid={error.hasError === true && data.description.trim() === ""}
        value={data.description}
        onChange={(e) => {
          setData({ ...data, description: e.target.value });
        }}
      />

      <div className="mt-5 w-full text-left text-lg font-semibold leading-7 text-black max-md:max-w-full">
        Address
      </div>
      <ExperienceAddressForm data={data} setData={setData} error={error} />
      <div className="mt-5 rounded-lg border-[1.3px] border-solid border-[color:var(--Blues-Gray2,#B8BBC2)] p-10">
        <div className="mb-10 mt-10 grid grid-cols-2">
          <div className="font-semibold">
            Inclusions
            <InclusionsListbox setData={setData} data={data} />
          </div>

          <div className="w-full text-left text-sm font-semibold leading-5 text-black max-md:max-w-full">
            More Details
            <div className="mt-5 grid grid-cols-2 gap-2 font-light">
              <div>
                Start Time
                <Input
                  width="186px"
                  type="time"
                  className="mt-5"
                  isInvalid={
                    error.hasError === true && data.start_time.trim() === ""
                  }
                  value={data.start_time}
                  onChange={(e) => {
                    setData({ ...data, start_time: e.target.value });
                  }}
                />
              </div>
              <div>
                End Time
                <Input
                  width="186px"
                  type="time"
                  className="mt-5"
                  isInvalid={
                    error.hasError === true && data.end_time.trim() === ""
                  }
                  value={data.end_time}
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

      <hr className="mt-12 min-h-[3px] w-full bg-zinc-200 max-md:mt-10 max-md:max-w-full" />
      <div className="mb-10 mt-10 w-full text-left text-lg font-semibold leading-5 text-black max-md:max-w-full">
        Upload photos of your place
      </div>
      <div className="grid rounded-3xl outline outline-1 outline-neutral-300 md:grid-cols-2">
        <div className="p-8">
          <ListingUploader media={media} setMedia={setMedia} />

          <div className="mt-3 text-center text-xs">Maximum of 5 photos</div>
        </div>
        <div className="rounded-3xl bg-primary-50 outline outline-1 outline-neutral-300">
          <AccommodationImageUpdate media={media} setMedia={setMedia} />
        </div>
      </div>

      <ExperiencePriceForm data={data} setData={setData} error={error} />
      <div>
        {error.hasError === true && (
          <ErrorMessage message={error.message as string} />
        )}
      </div>
      <div className="rounded-lg">
        <div className="mt-8  flex justify-between gap-5 self-end whitespace-nowrap text-sm leading-5">
          <Button
            className=" gap-y-1.5 rounded-lg bg-danger px-4 text-white max-md:px-5"
            size="md"
            onPress={onDelete}
            isDisabled={loading}
          >
            <TrashIcon />
            Delete
          </Button>
          <div className="flex gap-5">
            <Link href={`/listings/experiences/${listingid}`}>
              <Button
                className="justify-center rounded-lg bg-zinc-200 px-7 py-2.5 text-black max-md:px-5"
                size="md"
                isDisabled={loading}
              >
                Cancel
              </Button>
            </Link>

            <Button
              className="justify-center rounded-lg bg-primary-600 px-7 py-2.5 font-bold text-white drop-shadow-sm max-md:px-5 "
              size="md"
              onPress={onPress}
              isDisabled={loading}
              isLoading={loading}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default EditExperienceForm;

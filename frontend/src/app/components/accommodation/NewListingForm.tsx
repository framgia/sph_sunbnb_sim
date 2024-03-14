"use client";
import React from "react";
import { Input, Button, Textarea, Spinner } from "@nextui-org/react";
import ListboxComponent from "./ListboxComponent";
import AccommodationMoreDetails from "./AccommodationMoreDetails";
import TypeSelect from "./SelectType";
import UploadthingDropzone from "../uploadthing/UploadDropzone";
import type { Accommodation } from "@/app/interfaces/AccomodationData";
import AccommodationImage from "./ImageCollection";

interface NewListingProps {
  onPress: () => void;
  data: Accommodation;
  setData: React.Dispatch<React.SetStateAction<Accommodation>>;
  media: string[];
  setMedia: React.Dispatch<React.SetStateAction<string[]>>;
  loading: boolean;
  error: Record<string, string | boolean>;
}

const NewListingForm: React.FC<NewListingProps> = ({
  onPress,
  data,
  setData,
  media,
  setMedia,
  loading,
  error
}) => {
  return (
    <section className="flex max-w-[826px] flex-col px-5">
      <header className="w-full text-left text-lg font-semibold leading-7 text-black max-md:max-w-full">
        List Accommodation
      </header>
      <TypeSelect data={data} setData={setData} error={error} />
      <div className="mt-10 w-full text-left text-sm font-semibold leading-7 text-black max-md:max-w-full">
        Address
      </div>

      <Input
        aria-label="Province"
        type="text"
        className="mt-8"
        placeholder="Province"
        variant="bordered"
        isInvalid={error.hasError === true && data.province.trim() === ""}
        value={data.province}
        onChange={(e) => {
          setData({ ...data, province: e.target.value });
        }}
      />
      <div className="mt-5 flex w-full justify-between gap-5 whitespace-nowrap text-base leading-6 text-zinc-500 max-md:max-w-full max-md:flex-wrap">
        <Input
          aria-label="Street"
          type="text"
          className="mt-8"
          placeholder="Street"
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
          className="mt-8"
          placeholder="Barangay"
          variant="bordered"
          isInvalid={error.hasError === true && data.barangay.trim() === ""}
          value={data.barangay}
          onChange={(e) => {
            setData({ ...data, barangay: e.target.value });
          }}
        />
      </div>
      <div className="mt-5 flex w-full justify-between gap-5 whitespace-nowrap text-base leading-6 text-zinc-500 max-md:max-w-full max-md:flex-wrap">
        <Input
          aria-label="City"
          type="text"
          className="mt-8"
          placeholder="City"
          variant="bordered"
          isInvalid={error.hasError === true && data.city.trim() === ""}
          value={data.city}
          onChange={(e) => {
            setData({ ...data, city: e.target.value });
          }}
        />
        <Input
          aria-label="Zip Code"
          type="number"
          className="mt-8"
          placeholder="Zip Code"
          variant="bordered"
          isInvalid={error.hasError === true && data.zip_code < 1}
          value={data.zip_code.toString()}
          onChange={(e) => {
            setData({ ...data, zip_code: parseInt(e.target.value) });
          }}
        />
      </div>
      <div className="mt-12 min-h-[3px] w-full bg-zinc-200 max-md:mt-10 max-md:max-w-full"></div>
      <div className="mt-10 w-full text-left text-lg font-semibold leading-7 text-black max-md:max-w-full">
        Tell us about your place
      </div>
      <Input
        aria-label="Name"
        type="text"
        className="mt-8"
        placeholder="Title"
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
        className="mt-8 "
        variant="bordered"
        isInvalid={error.hasError === true && data.description.trim() === ""}
        value={data.description}
        onChange={(e) => {
          setData({ ...data, description: e.target.value });
        }}
      />

      <div className="mb-10 mt-5 rounded-lg border-[1.3px] border-solid border-[color:var(--Blues-Gray2,#B8BBC2)] p-10">
        <div className="grid md:grid-cols-2">
          <div>
            <div className="mb-5 w-full text-left text-sm font-semibold leading-5 text-black max-md:max-w-full">
              Amenities
            </div>
            <ListboxComponent data={data} setData={setData} />
          </div>
          <div>
            <div className="w-full text-left text-sm font-semibold leading-5 text-black max-md:max-w-full">
              More Details
            </div>
            <div>
              <AccommodationMoreDetails data={data} setData={setData} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 min-h-[3px] w-full bg-zinc-200 max-md:mt-10 max-md:max-w-full"></div>
      <div className="mb-10 mt-10 w-full text-left text-lg font-semibold leading-5 text-black max-md:max-w-full">
        Upload photos of your place
      </div>
      <div className="grid rounded-3xl outline outline-1 outline-neutral-300 md:grid-cols-2">
        <div className="p-8">
          <UploadthingDropzone media={media} setMedia={setMedia} />
          <div className="mt-3 text-center text-xs">Maximum of 5 photos</div>
        </div>
        <div className="rounded-3xl bg-primary-50 outline outline-1 outline-neutral-300">
          <AccommodationImage media={media} setMedia={setMedia} />
        </div>
      </div>

      <div className="mw-full mt-10 text-left text-sm font-semibold leading-5 text-black max-md:max-w-full ">
        Set your price
      </div>
      <div>
        <Input
          aria-label="Price"
          type="number"
          className="mt-8"
          startContent="₱"
          variant="bordered"
          isInvalid={error.hasError === true && data.price < 1}
          value={data.price.toString()}
          onChange={(e) => {
            setData({ ...data, price: parseInt(e.target.value) });
          }}
        />
      </div>
      <div>
        {error.hasError === true && (
          <div className="mt-5 text-xs text-red-500">{error.message}</div>
        )}
      </div>
      <div className="mt-9 flex gap-5 self-end whitespace-nowrap text-sm leading-5">
        <Button
          disabled={loading}
          className="grow justify-center rounded-lg bg-zinc-200 px-7 py-2.5 text-black max-md:px-5"
        >
          Cancel
        </Button>
        <Button
          className="grow justify-center rounded-lg bg-primary-600 px-7 py-2.5 font-bold text-white drop-shadow-sm max-md:px-5 "
          onPress={onPress}
          disabled={loading}
        >
          {loading ? <Spinner color="default" size="sm" /> : "Publish"}
        </Button>
      </div>
    </section>
  );
};
export default NewListingForm;

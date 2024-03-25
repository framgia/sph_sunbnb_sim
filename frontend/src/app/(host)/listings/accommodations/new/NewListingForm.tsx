"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import ListboxComponent from "../../../../components/accommodation/ListboxComponent";
import AccommodationMoreDetails from "../AccommodationMoreDetails";
import TypeSelect from "../SelectAccommodation";
import type { Accommodation } from "@/app/interfaces/AccomodationData";
import AccommodationImage from "./ImageCollection";
import DetailForm from "../DetailForm";
import PriceForm from "../../PriceForm";
import ListingUploader from "@/app/components/accommodation/ListingUploader";
import AccommodationAddressForm from "../../../../components/accommodation/AccommodationAddressForm";
import ErrorMessage from "@/app/components/ErrorMessage";

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
    <section className="flex w-full flex-col px-5">
      <header className="w-full text-left text-lg font-semibold leading-7 text-black max-md:max-w-full">
        List Accommodation
      </header>
      <TypeSelect data={data} setData={setData} error={error} />
      <AccommodationAddressForm data={data} setData={setData} error={error} />
      <hr className="mt-12 min-h-[3px] w-full bg-zinc-200 max-md:mt-10 max-md:max-w-full" />
      <DetailForm data={data} setData={setData} error={error} />
      <div className="mt-5 rounded-lg border-[1.3px] border-solid border-[color:var(--Blues-Gray2,#B8BBC2)] p-10">
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
          <AccommodationImage media={media} setMedia={setMedia} />
        </div>
      </div>

      <PriceForm data={data} setData={setData} error={error} />
      <div>
        {error.hasError === true && (
          <ErrorMessage message={error.message as string} />
        )}
      </div>
      <div className="mt-8 flex gap-5 self-end whitespace-nowrap text-sm leading-5">
        <Button
          isDisabled={loading}
          className="grow justify-center rounded-lg bg-zinc-200 px-7 py-2.5 text-black max-md:px-5"
        >
          Cancel
        </Button>
        <Button
          className="grow justify-center rounded-lg bg-primary-600 px-7 py-2.5 font-bold text-white drop-shadow-sm max-md:px-5 "
          onPress={onPress}
          isDisabled={loading}
          isLoading={loading}
        >
          Publish
        </Button>
      </div>
    </section>
  );
};
export default NewListingForm;

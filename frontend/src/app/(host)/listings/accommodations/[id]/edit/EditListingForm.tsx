"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import TrashIcon from "../../../../../components/svgs/TrashIcon";
import ListboxComponent from "../../../../../components/accommodation/ListboxComponent";
import AccommodationMoreDetails from "../../AccommodationMoreDetails";
import type {
  MediaUpdate,
  Accommodation
} from "../../../../../interfaces/AccomodationData";
import SelectType from "../../SelectAccommodation";
import AccommodationImageUpdate from "./ImageCollectionUpdate";
import AddressForm from "../../../AddressForm";
import DetailForm from "../../DetailForm";
import PriceForm from "../../../PriceForm";
import ListingUploader from "@/app/components/accommodation/ListingUploader";
import { deleteAccommodation } from "@/app/utils/helpers/accommodation/request";

interface EditListingProps {
  onDelete: () => void; // Function to handle delete action
  listingid: string;
  data: Accommodation;
  setData: React.Dispatch<React.SetStateAction<Accommodation>>;
  media: MediaUpdate;
  setMedia: React.Dispatch<React.SetStateAction<MediaUpdate>>;
  error: Record<string, string | boolean>;
  loading: boolean;
  onPress: () => void;
}

const EditListingForm: React.FC<EditListingProps> = ({
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
  const deleteResult = async (): Promise<void> => {
    try {
      const result = await deleteAccommodation(Number(listingid));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex w-full flex-col px-5">
      <header className="w-full text-left text-lg font-semibold leading-7 text-black max-md:max-w-full">
        List Accommodation
      </header>
      <SelectType data={data} setData={setData} error={error} />
      <AddressForm data={data} setData={setData} error={error} />
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
          <AccommodationImageUpdate media={media} setMedia={setMedia} />
        </div>
      </div>

      <PriceForm data={data} setData={setData} error={error} />
      <div>
        {error.hasError === true && (
          <div className="mt-5 text-xs text-red-500">{error.message}</div>
        )}
      </div>
      <div className="rounded-lg">
        <div className="mt-16  flex justify-between gap-5 self-end whitespace-nowrap text-sm leading-5">
          <Button
            className=" gap-y-1.5 rounded-lg bg-danger px-4 text-white max-md:px-5"
            size="md"
            onPress={onDelete}
            onClick={deleteResult}
            isDisabled={loading}
          >
            <TrashIcon />
            Delete
          </Button>
          <div className="flex gap-5">
            <Button
              className="justify-center rounded-lg bg-zinc-200 px-7 py-2.5 text-black max-md:px-5"
              size="md"
              isDisabled={loading}
            >
              Cancel
            </Button>
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
export default EditListingForm;

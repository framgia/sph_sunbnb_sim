"use server";
import React from "react";
import { Avatar, Image } from "@nextui-org/react";
import type { MediaType } from "@/app/interfaces/types";
import { getInitials } from "@/app/utils/helpers/getInitials";
import ToEditButton from "@/app/components/ToEditButton";
import { userRole } from "@/app/utils/helpers/userHelper";
import StatusChip from "../StatusChip";

interface ListingHeaderProps {
  id: number;
  accomodationName: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  minimumNights: number;
  maximumNights: number;
  type: string;
  city: string;
  price: number;
  hostName: string;
  createdAt: string;
  modifiedAt: string;
  address: string;
  images: MediaType[];
  status: string;
}
const ListingHeader: React.FC<ListingHeaderProps> = async ({
  id,
  accomodationName,
  guests,
  bedrooms,
  beds,
  bathrooms,
  minimumNights,
  maximumNights,
  type,
  city,
  price,
  address,
  hostName,
  createdAt,
  modifiedAt,
  images,
  status
}) => {
  async function checkIsHost(): Promise<boolean> {
    return (await userRole()) === "host";
  }
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-row">
          <span className="text-2xl font-bold leading-7">
            {accomodationName}
          </span>
          {(await checkIsHost()) && (
            <div className="mx-4">
              <StatusChip status={status} />
            </div>
          )}
        </div>
        {(await checkIsHost()) && (
          <div>
            <ToEditButton path={`/listings/accommodations/${id}/edit`} />
          </div>
        )}
      </div>
      <div className="mb-5 flex h-80 w-full flex-row items-center justify-center">
        <div className="relative mr-2 h-full w-2/4 overflow-hidden rounded-2xl">
          <Image
            src={images[0].media.replace(/['"]/g, "")}
            className="object-fill"
            alt="Listing Image"
            loading="lazy"
          />
        </div>
        <div className="grid h-full grid-cols-2 items-end gap-4">
          {images.slice(1).map((imageObj, i) => {
            return (
              <div
                key={i}
                className="relative mx-2 h-full w-60 overflow-hidden rounded-2xl"
              >
                <Image
                  src={imageObj.media.replace(/['"]/g, "")}
                  alt="listing image"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-10">
        <div className="mb-1 flex justify-between text-xl font-semibold leading-7">
          <span>
            {type} in {city}
          </span>
          <span>₱{price}</span>
        </div>

        <div className="mb-1 text-base leading-6 text-zinc-500">
          {guests > 1 ? guests + " Guests" : "1 Guest"} •{" "}
          {bedrooms > 1 ? bedrooms + " Bedrooms" : "1 Bedroom"} •{" "}
          {beds > 1 ? beds + " Beds" : "1 Bed"} •{" "}
          {bathrooms > 1 ? bathrooms + " Bathrooms" : "1 Bath"} •{" "}
          {minimumNights}-{maximumNights} days only
        </div>
        <div className="mb-1 text-sm font-semibold leading-4">{address}</div>
      </div>
      <div className="flex flex-row">
        <Avatar
          name={getInitials(hostName)}
          className="h-12 w-12 text-tiny uppercase"
        />
        <div className="mx-2 flex flex-col">
          <span className="text-base font-semibold leading-6">
            Hosted by {hostName}
          </span>
          <span className="text-xs leading-6 text-zinc-500">
            Posted at {createdAt} • Modified at {modifiedAt}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListingHeader;

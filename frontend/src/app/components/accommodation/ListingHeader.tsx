"use server";
import React from "react";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";
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
  return (
    <div>
      <div className="mb-2 grid grid-cols-2 gap-4 md:mb-4 md:flex md:grid-cols-3 md:items-center md:justify-between">
        <div className="col-span-2 flex">
          <span className="truncate text-2xl font-bold leading-7">
            {accomodationName}
          </span>
          {((await userRole()) === "host" ||
            (await userRole()) === "admin") && (
            <div className="mx-4">
              <StatusChip status={status} />
            </div>
          )}
        </div>
        <div className="flex md:justify-end">
          {(await userRole()) === "host" && (
            <div>
              <ToEditButton path={`/listings/accommodations/${id}/edit`} />
            </div>
          )}
        </div>
      </div>
      <div
        className={`${images.length === 1 ? "grid-rows-3" : "grid-rows-4"} mb-5 grid h-96 grid-flow-row grid-cols-4 gap-4 md:grid-rows-2`}
      >
        <div className="relative col-span-4 row-span-3 overflow-hidden rounded-2xl md:col-span-2 md:row-span-2">
          <Image
            src={images[0].media.replace(/['"]/g, "")}
            alt="Listing Image"
            fill
            priority
            sizes="100%"
            style={{ objectFit: "cover" }}
          />
        </div>
        {images.slice(1).map((imageObj, i) => {
          return (
            <div
              key={i}
              className="relative h-full w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={imageObj.media.replace(/['"]/g, "")}
                alt="listing image"
                loading="lazy"
                fill
                sizes="100%"
                style={{ objectFit: "cover" }}
              />
            </div>
          );
        })}
      </div>
      <div className="mb-7 md:mb-10">
        <div className="mb-1 grid grid-cols-2 gap-1 text-xl font-semibold leading-7 md:flex md:justify-between">
          <div className="col-span-2 md:col-auto">
            <span>
              {type} in {city}
            </span>
          </div>
          {((await userRole()) === "host" ||
            (await userRole()) === "admin") && (
            <div className="md:col-auto">
              <span>₱{price}</span>
            </div>
          )}
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

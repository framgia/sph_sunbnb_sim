"use server";
import type { MediaType } from "@/app/interfaces/types";
import { getInitials } from "@/app/utils/helpers/getInitials";
import { Avatar, Image } from "@nextui-org/react";
import React from "react";
import ToEditButton from "../ToEditButton";
import { userRole } from "@/app/utils/helpers/userHelper";
import StatusChip from "../StatusChip";

interface ExperienceHeaderProps {
  id: number;
  experienceName: string;
  images: MediaType[];
  street: string;
  barangay: string;
  city: string;
  type: string;
  price: number;
  zipCode: number;
  languages: string[];
  startTime: string;
  endTime: string;
  hostName: string;
  createdAt: string;
  modifiedAt: string;
  status: string;
}
const ExperienceHeader: React.FC<ExperienceHeaderProps> = async ({
  id,
  experienceName,
  images,
  street,
  barangay,
  city,
  type,
  price,
  zipCode,
  languages,
  startTime,
  endTime,
  hostName,
  createdAt,
  modifiedAt,
  status
}) => {
  function getDuration(start: string, end: string): number {
    const startArr = start.split(":");
    const endArr = end.split(":");
    const startSec = Number(startArr[0]) * 3600 + Number(startArr[1]) * 60;
    const endSec = Number(endArr[0]) * 3600 + Number(endArr[1]) * 60;
    const diff = Math.abs(endSec - startSec);
    return Math.floor(diff / 3600);
  }

  return (
    <div>
      <div className="mb-2 grid grid-cols-2 gap-4 md:mb-4 md:flex md:grid-cols-3 md:items-center md:justify-between">
        <div className="col-span-2 flex">
          <span className="truncate text-2xl font-bold leading-7">
            {experienceName}
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
              <ToEditButton path={`/listings/experiences/${id}/edit`} />
            </div>
          )}
        </div>
      </div>
      <div className="mb-5 grid h-96 grid-flow-row grid-cols-4 grid-rows-4 gap-4 md:grid-rows-2">
        <div className="relative col-span-4 row-span-3 overflow-hidden rounded-2xl md:col-span-2 md:row-span-2">
          <Image
            src={images[0].media.replace(/['"]/g, "")}
            className="object-fill"
            alt="Listing Image"
            loading="lazy"
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
                className="object-fill"
                alt="Listing Image"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
      <div className="mb-7 md:mb-10">
        <div className="mb-1 grid grid-cols-2 gap-1 text-xl font-semibold leading-7 md:flex md:justify-between">
          <div className="col-span-2 md:col-auto">
            <span>
              {street}, {barangay}, {city}, {zipCode}
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
          {type} •{" "}
          {languages !== undefined
            ? languages.map((lang, i) => {
                return i === languages.length - 1 ? lang : lang + ", ";
              })
            : "Hey"}{" "}
          •{" "}
          {getDuration(startTime, endTime) > 1
            ? getDuration(startTime, endTime) + " hours"
            : getDuration(startTime, endTime) + " hour"}
        </div>
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

export default ExperienceHeader;

"use server";
import type { MediaType } from "@/app/interfaces/types";
import { getInitials } from "@/app/utils/helpers/getInitials";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import ToEditButton from "../ToEditButton";
import { checkCookies, userRole } from "@/app/utils/helpers/userHelper";
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
      <div className="mb-4 flex items-center justify-between">
        <div className="flex">
          <span className="text-2xl font-bold leading-7">{experienceName}</span>
          {((await userRole()) === "host" ||
            (await userRole()) === "admin") && (
            <div className="mx-4">
              <StatusChip status={status} />
            </div>
          )}
        </div>
        {(await userRole()) === "host" && (
          <div>
            <ToEditButton path={`/listings/experiences/${id}/edit`} />
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
            fill
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
                  fill
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-10">
        <div className="mb-1 flex justify-between text-xl font-semibold leading-7">
          <span>
            {street}, {barangay}, {city}, {zipCode}
          </span>
          {((await userRole()) === "host" ||
            (await userRole()) === "admin") && <span>₱{price}</span>}
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

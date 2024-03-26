"use client";
import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { formatCurrency } from "@/app/utils/currency";
import { type GuestListingItemProps } from "@/app/interfaces/ListingsProps";
import { useRouter } from "next/navigation";

const GuestListingItem: React.FC<GuestListingItemProps> = ({
  listing,
  type
}) => {
  const router = useRouter();

  function handleCardPress(): void {
    router.push(`/${type}/${listing.id}`);
  }

  return (
    <Card
      shadow="none"
      className="w-full"
      isPressable
      onClick={handleCardPress}
    >
      <CardBody className="flex items-center justify-center rounded-xl bg-zinc-50 p-0">
        <Image
          alt="Sample Photo"
          className="h-56 overflow-hidden rounded-xl"
          src={listing.media[0].media}
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start">
        <p className="truncate text-sm font-bold capitalize">
          {`${listing.name} in ${listing.province}`}
        </p>
        <p className="text-sm">
          <span className="font-bold">
            {formatCurrency("PHP", 2, listing.price)}
          </span>
          {type === "accommodations" ? " per night" : " per pax"}
        </p>
      </CardFooter>
    </Card>
  );
};

export default GuestListingItem;

"use client";
import React from "react";
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";
import { type HostListingItemProps } from "@/app/interfaces/ListingsProps";
import { ListingStatus } from "@/app/utils/enums";
import { useRouter } from "next/navigation";

const HostListingItem: React.FC<HostListingItemProps> = ({ listing, type }) => {
  const router = useRouter();

  function handleCardPress(): void {
    router.push(`/listings/${type}/${listing.id}`);
  }

  return (
    <Card
      className="w-full px-4 py-3"
      shadow="sm"
      isPressable
      onPress={handleCardPress}
    >
      <CardHeader className="flex-col items-start gap-1 overflow-hidden">
        <p className="truncate text-sm font-bold capitalize">{listing.name}</p>
        <Chip
          color={
            listing.status === ListingStatus.ACTIVE
              ? "success"
              : listing.status === ListingStatus.PENDING
                ? "warning"
                : "danger"
          }
          size="sm"
          className="capitalize"
        >
          {listing.status}
        </Chip>
      </CardHeader>
      <CardBody className="flex items-center justify-center rounded-xl bg-zinc-50 p-0">
        {listing.media.length > 0 ? (
          <Image
            alt={`${listing.name} Photo`}
            className="h-40 overflow-hidden rounded-xl"
            src={listing.media[0].media}
          />
        ) : (
          <p className="text-sm text-zinc-500">No photo available.</p>
        )}
      </CardBody>
    </Card>
  );
};

export default HostListingItem;

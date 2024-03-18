import React from "react";
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";
import { type HostListingItemProps } from "@/app/interfaces/HostListingsProps";
import { ListingStatus } from "@/app/utils/enums";
import { useRouter } from "next/navigation";

const HostListingItem: React.FC<HostListingItemProps> = ({ listing, type }) => {
  const router = useRouter();

  function handleCardPress(): void {
    router.push(`/listings/${type}/${listing.id}`);
  }

  return (
    <Card
      className="px-2 py-2"
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
      <CardBody className="">
        {listing.media.length > 0 ? (
          <Image
            alt={`${listing.name} Photo`}
            className="rounded-xl object-cover"
            src={listing.media[0].media}
            width="full"
          />
        ) : (
          <p className="text-sm text-zinc-500">No photo available.</p>
        )}
      </CardBody>
    </Card>
  );
};

export default HostListingItem;

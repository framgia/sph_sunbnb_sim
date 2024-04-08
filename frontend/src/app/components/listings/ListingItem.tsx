"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image
} from "@nextui-org/react";
import { formatCurrency } from "@/app/utils/currency";
import { type ListingItemProps } from "@/app/interfaces/ListingsProps";
import { useRouter } from "next/navigation";
import { ListingType, UserRole } from "@/app/utils/enums";
import StatusChip from "../StatusChip";

const ListingItem: React.FC<ListingItemProps> = ({ user, type, listing }) => {
  const router = useRouter();

  function handleCardPress(): void {
    if (user === UserRole.GUEST) {
      router.push(`/${type.toLowerCase()}s/${listing.id}`);
    } else if (user === UserRole.HOST) {
      router.push(`/listings/${type.toLowerCase()}s/${listing.id}`);
    } else if (user === UserRole.ADMIN) {
      router.push(`/approvals/${type.toLowerCase()}/${listing.id}`);
    }
  }

  if (user === UserRole.GUEST)
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
        <CardFooter className="flex flex-col items-start overflow-hidden">
          <p className="w-full truncate text-start text-sm font-bold capitalize">
            {`${listing.name} in ${listing.province}`}
          </p>
          <p className="text-sm">
            <span className="font-bold">
              {formatCurrency("PHP", 2, listing.price)}
            </span>
            {type === ListingType.ACCOMMODATION ? " per night" : " per pax"}
          </p>
        </CardFooter>
      </Card>
    );

  if (user === UserRole.HOST || user === UserRole.ADMIN)
    return (
      <Card
        className="w-full px-4 py-3"
        shadow="sm"
        isPressable
        onPress={handleCardPress}
      >
        <CardHeader className="flex-col items-start gap-1">
          <p className="w-full truncate text-start text-sm font-bold capitalize">
            {listing.name}
          </p>
          <StatusChip status={listing.status} />
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

export default ListingItem;

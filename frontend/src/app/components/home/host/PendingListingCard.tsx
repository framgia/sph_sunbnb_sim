"use client";
import React from "react";
import WatchIconSm from "../../svgs/WatchIconSm";
import { useRouter } from "next/navigation";

interface PendingListingProps {
  listingId: number;
  listingName: string;
  type: "accommodation" | "experience";
}
const PendingListingCard: React.FC<PendingListingProps> = ({
  listingId,
  listingName,
  type
}) => {
  const router = useRouter();
  function handleClick(): void {
    if (type === "experience")
      router.push(`/listings/experiences/${listingId}`);
    else router.push(`/listings/accommodations/${listingId}`);
  }
  return (
    <div className="flex h-20 w-40 flex-row justify-between rounded-xl border-1 border-foreground-300 p-2">
      <div className="flex w-3/4 flex-col justify-center px-2">
        <div className="truncate text-sm">
          <span>{listingName}</span>
        </div>
        <div onClick={handleClick}>
          <span className="cursor-pointer text-xs underline">View</span>
        </div>
      </div>
      <div className="w-1/4 self-center text-primary-500">
        <WatchIconSm />
      </div>
    </div>
  );
};

export default PendingListingCard;

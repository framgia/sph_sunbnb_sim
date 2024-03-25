import React from "react";
import WatchIconSm from "../../svgs/WatchIconSm";

const PendingListingCard: React.FC = () => {
  return (
    <div className="flex h-20 w-40 flex-row justify-between rounded-xl border-1 border-foreground-300 p-2">
      <div className="flex flex-col justify-center px-2">
        <div>
          <span className="text-sm">Listing 1</span>
        </div>
        <div>
          <span className="cursor-pointer text-xs underline">View</span>
        </div>
      </div>
      <div className="self-center px-2 text-primary-500">
        <WatchIconSm />
      </div>
    </div>
  );
};

export default PendingListingCard;

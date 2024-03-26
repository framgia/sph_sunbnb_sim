"use client";
import React from "react";
import PendingListingCard from "./PendingListingCard";

interface PendingCardsSlicerProps {
  //  Replace with type Listing on integration
  cards: Array<{ id: number; name: string }>;
}
const PendingCardsSlicer: React.FC<PendingCardsSlicerProps> = ({ cards }) => {
  return (
    <div className="mb-5 flex flex-col py-2">
      <div className="flex w-full flex-row justify-between">
        <div>
          <span className="text-xs font-semibold">Waiting for approval</span>
        </div>
        <div>
          {cards.length > 5 ? (
            // TBD if modal, separate page, modify slice OnClick
            <span className="cursor-pointer text-xs font-semibold underline">
              Show all ({cards.length})
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 py-5">
        {cards.slice(0, 5).map((card, i) => {
          return (
            <PendingListingCard
              key={i}
              listingId={card.id}
              listingName={card.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PendingCardsSlicer;

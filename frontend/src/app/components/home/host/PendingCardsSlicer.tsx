"use client";
import React from "react";
import PendingListingCard from "./PendingListingCard";
import type { Listing } from "@/app/interfaces/types";
import { useDisclosure } from "@nextui-org/react";
import PendingListModal from "./PendingListModal";
import { getListingType } from "@/app/utils/helpers/getListingType";

interface PendingCardsSlicerProps {
  cards: Listing[];
}

const PendingCardsSlicer: React.FC<PendingCardsSlicerProps> = ({ cards }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="mb-5 flex flex-col py-2">
      <div className="flex w-full flex-row justify-between">
        <div>
          <span className="text-xs font-semibold">Waiting for approval</span>
        </div>
        <div>
          {cards.length > 5 ? (
            <span
              onClick={onOpen}
              className="cursor-pointer text-xs font-semibold underline"
            >
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
              type={getListingType(card.listable_type)}
            />
          );
        })}
      </div>
      <PendingListModal
        isOpen={isOpen}
        onClose={onClose}
        cards={cards}
        size="5xl"
      />
    </div>
  );
};

export default PendingCardsSlicer;

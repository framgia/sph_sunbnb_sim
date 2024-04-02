import type { ModalProps } from "@/app/interfaces/ModalProps";
import { Modal, ModalContent } from "@nextui-org/react";
import React from "react";
import PendingListingCard from "./PendingListingCard";
import type { Listing } from "@/app/interfaces/types";
import { getListingType } from "@/app/utils/helpers/getListingType";

interface PendingListModalProps extends ModalProps {
  cards: Listing[];
}

const PendingListModal: React.FC<PendingListModalProps> = ({
  size,
  isOpen,
  onClose,
  cards
}) => {
  return (
    <div>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <div className="p-8">
                <div className="text-lg font-bold">Listings for Approval</div>
                <div className="grid grid-cols-5 gap-4 py-5">
                  {cards.map((card, i) => {
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
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PendingListModal;

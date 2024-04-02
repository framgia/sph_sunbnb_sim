import type { ModalProps } from "@/app/interfaces/ModalProps";
import {
  Avatar,
  Button,
  Modal,
  ModalContent,
  useDisclosure
} from "@nextui-org/react";
import React from "react";
import StarComponent from "./StarsComponent";
import { getInitials } from "@/app/utils/helpers/getInitials";
import { formatTimestamp } from "@/app/utils/date";

interface ReviewModalProps extends ModalProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
}

const ShowReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  size,
  name,
  date,
  rating,
  comment
}) => {
  const {} = useDisclosure();

  return (
    <div>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <div className="p-5 py-8">
              <div className="flex flex-col items-center justify-center">
                <div>
                  <Avatar name={getInitials(name)} />
                </div>

                <div className="text-lg font-semibold">{name}</div>
                <div className="text-sm text-neutral-400">
                  {formatTimestamp(date)}
                </div>
                <div>
                  <StarComponent score={Math.round(rating)} />
                </div>
              </div>
              <div className="m-3 font-semibold">Review:</div>
              <div className="m-3 max-h-80 justify-normal overflow-y-scroll	">
                {comment}
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ShowReviewModal;

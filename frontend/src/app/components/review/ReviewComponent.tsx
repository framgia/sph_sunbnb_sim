"use client";
import { getInitials } from "@/app/utils/helpers/getInitials";
import { Avatar, useDisclosure } from "@nextui-org/react";
import React from "react";
import StarComponent from "./StarsComponent";
import { formatTimestamp } from "@/app/utils/date";
import ShowReviewModal from "./ShowReviewModal";

interface ReviewComponentProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
}
const ReviewComponent: React.FC<ReviewComponentProps> = ({
  name,
  rating,
  comment,
  date
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="cursor-pointer p-2 hover:bg-neutral-100" onClick={onOpen}>
        <div className="mb-2 flex flex-row">
          <div className="m-0 items-center p-2">
            <Avatar name={getInitials(name)} />
          </div>
          <div className="flex flex-col p-1 pl-2">
            <span className="text-base md:text-lg">{name}</span>
            <span className="text-sm font-light leading-5 text-foreground-500">
              {formatTimestamp(date)}
            </span>
          </div>
        </div>
        <div className="my-2">
          <StarComponent score={Math.round(rating)} />
        </div>
        <div className="line-clamp-3 text-base md:text-sm">{comment}</div>
      </div>
      <ShowReviewModal
        name={name}
        date={date}
        isOpen={isOpen}
        onClose={onClose}
        rating={rating}
        comment={comment}
        size="lg"
      />
    </>
  );
};

export default ReviewComponent;

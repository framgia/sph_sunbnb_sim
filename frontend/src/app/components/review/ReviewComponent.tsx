import { getInitials } from "@/app/utils/helpers/getInitials";
import { Avatar } from "@nextui-org/react";
import React from "react";
import StarComponent from "./StarsComponent";

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
  return (
    <div className="p-2">
      <div className="mb-2 flex flex-row">
        <div className="m-0 items-center p-2">
          <Avatar name={getInitials(name)} />
        </div>
        <div className="flex flex-col p-1 pl-2">
          <span className="text-xl">{name}</span>
          <span className="text-sm font-light leading-5 text-foreground-500">
            {date}
          </span>
        </div>
      </div>
      <div className="my-2">
        <StarComponent score={Math.round(rating)} />
      </div>
      <div className="line-clamp-3">{comment}</div>
    </div>
  );
};

export default ReviewComponent;

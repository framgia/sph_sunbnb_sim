import type { ReviewType } from "@/app/interfaces/types";
import { Progress } from "@nextui-org/react";
import React from "react";
import CleanlinessIcon from "../svgs/Review/CleanlinessIcon";
import ValueIcon from "../svgs/Review/ValueIcon";
import LocationIcon from "../svgs/Review/LocationIcon";

interface ReviewHeaderProps {
  reviews: ReviewType[];
}
const ReviewHeader: React.FC<ReviewHeaderProps> = ({ reviews }) => {
  let fiveCount = 0;
  let fourCount = 0;
  let threeCount = 0;
  let twoCount = 0;
  let OneCount = 0;

  fiveCount = reviews.reduce((sum, review) => {
    return review.overall_rating === 5 ? sum + 1 : sum;
  }, 0);
  fourCount = reviews.reduce((sum, review) => {
    return review.overall_rating === 4 ? sum + 1 : sum;
  }, 0);
  threeCount = reviews.reduce((sum, review) => {
    return review.overall_rating === 3 ? sum + 1 : sum;
  }, 0);
  twoCount = reviews.reduce((sum, review) => {
    return review.overall_rating === 2 ? sum + 1 : sum;
  }, 0);
  OneCount = reviews.reduce((sum, review) => {
    return review.overall_rating === 1 ? sum + 1 : sum;
  }, 0);

  return (
    <div className="border-b-1 border-foreground-300">
      <div className="flex w-full flex-row divide-x-2">
        <div className="flex w-1/4 flex-col px-5 pb-5">
          <span className="mb-2 py-2 text-xl">Overall Rating</span>
          <div className="flex w-full flex-row items-center ">
            <div className="mr-2">5</div>
            <div className="flex w-full justify-center ">
              <Progress
                className="w-3/4 self-center"
                color="default"
                size="sm"
                value={fiveCount}
                maxValue={reviews.length}
                aria-label="5 overall ratings"
              />
            </div>
          </div>
          <div className="flex w-full flex-row items-center">
            <div className="mr-2">4</div>
            <div className="flex w-full justify-center ">
              <Progress
                className="w-3/4 self-center"
                color="default"
                value={fourCount}
                maxValue={reviews.length}
                size="sm"
                aria-label="4 overall ratings"
              />
            </div>
          </div>
          <div className="flex w-full flex-row items-center">
            <div className="mr-2">3</div>
            <div className="flex w-full justify-center ">
              <Progress
                size="sm"
                className="w-3/4 self-center"
                color="default"
                value={threeCount}
                maxValue={reviews.length}
                aria-label="3 overall ratings"
              />
            </div>
          </div>
          <div className="flex w-full flex-row items-center">
            <div className="mr-2">2</div>
            <div className="flex w-full justify-center ">
              <Progress
                size="sm"
                className="w-3/4 self-center"
                color="default"
                value={twoCount}
                maxValue={reviews.length}
                aria-label="2 overall ratings"
              />
            </div>
          </div>
          <div className="flex w-full flex-row items-center">
            <div className="mr-2">1</div>
            <div className="flex w-full justify-center ">
              <Progress
                size="sm"
                className="w-3/4 self-center"
                color="default"
                value={OneCount}
                maxValue={reviews.length}
                aria-label="1 overall ratings"
              />
            </div>
          </div>
        </div>
        <div className="flex w-1/4 flex-col justify-between px-5 py-2">
          <div className="flex flex-col">
            <span className="mb-2 text-xl">Cleanliness</span>
            <div className="text-xl font-bold"> 5 </div>
          </div>
          <CleanlinessIcon />
        </div>
        <div className="flex w-1/4 flex-col justify-between px-5 py-2">
          <div className="flex flex-col">
            <span className="mb-2 text-xl">Value</span>
            <div className="text-xl font-bold"> 5 </div>
          </div>
          <ValueIcon />
        </div>
        <div className="flex w-1/4 flex-col justify-between px-5 py-2">
          <div className="flex flex-col">
            <span className="mb-2 text-xl">Location</span>
            <div className="text-xl font-bold"> 5 </div>
          </div>
          <LocationIcon />
        </div>
      </div>
      <div className="h-4 w-full" />
    </div>
  );
};

export default ReviewHeader;

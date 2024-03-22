import type { ReviewType } from "@/app/interfaces/types";
import { Progress } from "@nextui-org/react";
import React from "react";
import CleanlinessIcon from "../svgs/Review/CleanlinessIcon";
import ValueIcon from "../svgs/Review/ValueIcon";
import LocationIcon from "../svgs/Review/LocationIcon";
import {
  calculateRatingCount,
  calculateAverageRating
} from "@/app/utils/helpers/review/calculate";

interface ReviewHeaderProps {
  reviews: ReviewType[];
}
const ReviewHeader: React.FC<ReviewHeaderProps> = ({ reviews }) => {
  const fiveCount = calculateRatingCount(reviews, 5);
  const fourCount = calculateRatingCount(reviews, 4);
  const threeCount = calculateRatingCount(reviews, 3);
  const twoCount = calculateRatingCount(reviews, 2);
  const oneCount = calculateRatingCount(reviews, 1);
  const cleanliness = calculateAverageRating(reviews, "cleanliness_rating");
  const value = calculateAverageRating(reviews, "value_rating");
  const location = calculateAverageRating(reviews, "location_rating");

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
                value={oneCount}
                maxValue={reviews.length}
                aria-label="1 overall ratings"
              />
            </div>
          </div>
        </div>
        <div className="flex w-1/4 flex-col justify-between px-5 py-2">
          <div className="flex flex-col">
            <span className="mb-2 text-xl">Cleanliness</span>
            <div className="text-xl font-bold"> {cleanliness.toFixed(0)} </div>
          </div>
          <CleanlinessIcon />
        </div>
        <div className="flex w-1/4 flex-col justify-between px-5 py-2">
          <div className="flex flex-col">
            <span className="mb-2 text-xl">Value</span>
            <div className="text-xl font-bold"> {value.toFixed(0)} </div>
          </div>
          <ValueIcon />
        </div>
        <div className="flex w-1/4 flex-col justify-between px-5 py-2">
          <div className="flex flex-col">
            <span className="mb-2 text-xl">Location</span>
            <div className="text-xl font-bold"> {location.toFixed(0)} </div>
          </div>
          <LocationIcon />
        </div>
      </div>
      <div className="h-4 w-full" />
    </div>
  );
};

export default ReviewHeader;

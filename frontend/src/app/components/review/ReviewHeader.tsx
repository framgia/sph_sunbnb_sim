import type { ReviewMetadata } from "@/app/interfaces/types";
import { Progress } from "@nextui-org/react";
import React from "react";
import CleanlinessIcon from "../svgs/Review/CleanlinessIcon";
import ValueIcon from "../svgs/Review/ValueIcon";
import LocationIcon from "../svgs/Review/LocationIcon";

interface ReviewHeaderProps {
  metadata: ReviewMetadata;
  listingType: "accommodation" | "experience";
}
const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  metadata,
  listingType
}) => {
  return (
    <div className="border-b-1 border-foreground-300">
      <div className="flex w-full flex-row divide-x-2">
        <div
          className={`flex flex-col pb-5 ${listingType === "accommodation" ? "mr-2 h-20 w-1/4" : "w-full"}`}
        >
          <span className="mb-2 text-xs md:text-base">Overall Rating</span>
          <div className="flex w-full flex-row items-center">
            <div className="mr-2 text-sm">5</div>
            <div className="flex w-full justify-center">
              <Progress
                className="w-3/4 self-center"
                color="default"
                size="sm"
                value={metadata.ratings_count["5"] ?? 0}
                maxValue={metadata.total_reviews}
                aria-label="5 overall ratings"
              />
            </div>
          </div>
          <div className="flex w-full flex-row items-center">
            <div className="mr-2 text-sm">4</div>
            <div className="flex w-full justify-center ">
              <Progress
                className="w-3/4 self-center"
                color="default"
                value={metadata.ratings_count["4"] ?? 0}
                maxValue={metadata.total_reviews}
                size="sm"
                aria-label="4 overall ratings"
              />
            </div>
          </div>
          <div className="flex w-full flex-row items-center">
            <div className="mr-2 text-sm">3</div>
            <div className="flex w-full justify-center ">
              <Progress
                size="sm"
                className="w-3/4 self-center"
                color="default"
                value={metadata.ratings_count["3"] ?? 0}
                maxValue={metadata.total_reviews}
                aria-label="3 overall ratings"
              />
            </div>
          </div>
          <div className="flex w-full flex-row items-center">
            <div className="mr-2 text-sm">2</div>
            <div className="flex w-full justify-center ">
              <Progress
                size="sm"
                className="w-3/4 self-center"
                color="default"
                value={metadata.ratings_count["2"] ?? 0}
                maxValue={metadata.total_reviews}
                aria-label="2 overall ratings"
              />
            </div>
          </div>
          <div className="flex w-full flex-row items-center">
            <div className="mr-2 text-sm">1</div>
            <div className="flex w-full justify-center ">
              <Progress
                size="sm"
                className="w-3/4 self-center"
                color="default"
                value={metadata.ratings_count["1"] ?? 0}
                maxValue={metadata.total_reviews}
                aria-label="1 overall ratings"
              />
            </div>
          </div>
        </div>
        {listingType === "accommodation" && (
          <>
            <div className="flex w-1/4 flex-col items-start justify-start">
              <div className="mb-10 ml-2 flex flex-col md:ml-5">
                <span className="mb-2 text-xs md:text-base">Cleanliness</span>
                <div className="text-base font-bold">
                  {Number(metadata.average_cleanliness).toFixed(0) ?? 0}
                </div>
              </div>
              <div className="ml-2 md:ml-5">
                <CleanlinessIcon />
              </div>
            </div>
            <div className="flex w-1/4 flex-col items-start justify-start">
              <div className="mb-10 ml-2 flex flex-col md:ml-5">
                <span className="mb-2 text-xs md:text-base">Value</span>
                <div className="text-base font-bold">
                  {" "}
                  {Number(metadata.average_value).toFixed(0) ?? 0}{" "}
                </div>
              </div>
              <div className="ml-2 md:ml-5">
                <ValueIcon />
              </div>
            </div>
            <div className="flex w-1/4 flex-col items-start justify-start">
              <div className="mb-10 ml-2 flex flex-col md:ml-5">
                <span className="mb-2 text-xs md:text-base">Location</span>
                <div className="text-base font-bold">
                  {" "}
                  {Number(metadata.average_location).toFixed(0) ?? 0}{" "}
                </div>
              </div>
              <div className="ml-2 md:ml-5">
                <LocationIcon />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="h-4 w-full" />
    </div>
  );
};

export default ReviewHeader;

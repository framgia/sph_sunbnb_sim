"use client";
import React, { useState } from "react";
import StarIcon from "../svgs/Review/StarIcon";
import FilledStarIcon from "../svgs/Review/FilledStarIcon";
import type { AccommodationReviewData } from "@/app/interfaces/types";

interface StarsAddReviewProps {
  rating: AccommodationReviewData;
  field: keyof AccommodationReviewData;
  setScore: React.Dispatch<React.SetStateAction<AccommodationReviewData>>;
}
const StarsAccommodationReview: React.FC<StarsAddReviewProps> = ({
  rating,
  field,
  setScore
}) => {
  const [targetRating, setTarget] = useState(0);
  return (
    <div className="flex flex-row">
      {[...Array(5)].map((_star, i) => {
        const score = i + 1;
        return (
          <>
            <label>
              <input
                className="hidden"
                type="radio"
                name="rating"
                value={score}
                onClick={() => {
                  setScore({ ...rating, [field]: score });
                }}
              />
              <div
                className="cursor-pointer"
                onMouseOver={() => {
                  setTarget(score);
                }}
                onMouseLeave={() => {
                  setTarget(0);
                }}
              >
                {score <= Number(rating[field]) || score <= targetRating ? (
                  <FilledStarIcon />
                ) : (
                  <StarIcon />
                )}
              </div>
            </label>
          </>
        );
      })}
    </div>
  );
};

export default StarsAccommodationReview;

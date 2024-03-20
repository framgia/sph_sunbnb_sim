"use client";
import React, { useState } from "react";
import StarIcon from "../svgs/Review/StarIcon";
import FilledStarIcon from "../svgs/Review/FilledStarIcon";

interface StarsAddReviewProps {
  rating: number;
  setScore: (value: number) => void;
}
const StarsAddReview: React.FC<StarsAddReviewProps> = ({
  rating,
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
                  setScore(score);
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
                {score <= rating || score <= targetRating ? (
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

export default StarsAddReview;

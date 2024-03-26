"use server";
import React from "react";
import ReviewComponent from "./ReviewComponent";
import ReviewHeader from "./ReviewHeader";
import ReviewPaginate from "./ReviewPaginate";
import { getReviews } from "@/app/utils/helpers/review/request";

interface ReviewSectionProps {
  listingId: number;
  listingType: "accommodation" | "experience";
}

const ReviewSection: React.FC<ReviewSectionProps> = async ({
  listingId,
  listingType
}) => {
  const reviews = await getReviews(listingId);
  return (
    <>
      <div className="mb-5">
        <span className="text-xl font-semibold">
          Ratings and Reviews ({reviews.length})
        </span>
      </div>

      {reviews.length <= 0 ? (
        <div className="flex h-40 w-full items-center justify-center">
          <span className="text-zinc-500">No reviews yet.</span>
        </div>
      ) : (
        <>
          <ReviewHeader reviews={reviews} listingType={listingType} />
          <div className="mt-5 grid grid-cols-2">
            {reviews.map((review, i) => {
              return (
                <div className="mb-5" key={i}>
                  <ReviewComponent
                    name={`${review.user.first_name} ${review.user.last_name}`}
                    date={review.created_at}
                    rating={review.overall_rating}
                    comment={review.comment}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex w-full justify-center">
            <ReviewPaginate />
          </div>
        </>
      )}
    </>
  );
};

export default ReviewSection;

"use server";
import React from "react";
import { getReviews } from "@/app/utils/helpers/review/request";
import ReviewPaginate from "./ReviewPaginate";

interface ReviewSectionProps {
  listingId: number;
  listingType: "accommodation" | "experience";
}

const ReviewSection: React.FC<ReviewSectionProps> = async ({
  listingId,
  listingType
}) => {
  const { reviews, pagination } = await getReviews(listingId);
  return (
    <>
      <div className="mb-5">
        <span className="text-xl font-semibold">
          Ratings and Reviews ({reviews.length})
        </span>
      </div>
      <ReviewPaginate
        reviews={reviews}
        pagination={pagination}
        listingType={listingType}
        id={listingId}
      />
    </>
  );
};

export default ReviewSection;

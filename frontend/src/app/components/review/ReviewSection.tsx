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
  const { reviews, pagination, metadata } = await getReviews(listingId);
  return (
    <>
      <ReviewPaginate
        reviews={reviews}
        pagination={pagination}
        listingType={listingType}
        id={listingId}
        metadata={metadata}
      />
    </>
  );
};

export default ReviewSection;

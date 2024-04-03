"use client";
import type { PaginationType, ReviewType } from "@/app/interfaces/types";
import { Pagination } from "@nextui-org/react";
import React, { useEffect } from "react";
import ReviewHeader from "./ReviewHeader";
import ReviewComponent from "./ReviewComponent";
import { getReviews } from "@/app/utils/helpers/review/request";

interface ReviewPaginateProps {
  pagination: PaginationType;
  reviews: ReviewType[];
  listingType: "accommodation" | "experience";
  id: number;
}

const ReviewPaginate: React.FC<ReviewPaginateProps> = ({
  pagination,
  reviews,
  listingType,
  id
}) => {
  const [page, setPage] = React.useState(1);
  const [reviewArr, setReviewArr] = React.useState(reviews);
  const [paginationState, setPaginationState] = React.useState(pagination);
  useEffect(() => {
    async function getData(): Promise<void> {
      const newReviews = await getReviews(id, page);
      setReviewArr(newReviews.reviews);
      setPaginationState(newReviews.pagination);
    }
    getData().catch((error) => {
      console.error("Failed to get reviews: ", error);
    });
  }, [page, id]);
  return (
    <>
      {reviewArr.length <= 0 ? (
        <div className="flex h-40 w-full items-center justify-center">
          <span className="text-zinc-500">No reviews yet.</span>
        </div>
      ) : (
        <>
          <ReviewHeader reviews={reviews} listingType={listingType} />
          <div className="h-96">
            <div className="mt-5 grid grid-cols-2">
              {reviewArr.map((review, i) => {
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
          </div>
          <div className="flex w-full justify-center"></div>
        </>
      )}
      <Pagination
        className="flex w-full justify-center"
        isCompact
        showControls
        total={Math.ceil(paginationState.total / paginationState.per_page)}
        initialPage={1}
        page={paginationState.current_page}
        color="primary"
        onChange={(page) => {
          setPage(page);
        }}
      />
    </>
  );
};

export default ReviewPaginate;

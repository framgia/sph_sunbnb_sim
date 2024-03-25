import type { ReviewType } from "@/app/interfaces/types";

function calculateRatingCount(reviews: ReviewType[], rating: number): number {
  return reviews.reduce((sum, review) => {
    return Math.round(review.overall_rating) === rating ? sum + 1 : sum;
  }, 0);
}

function calculateAverageRating(
  reviews: ReviewType[],
  attribute: keyof ReviewType
): number {
  const totalReviews = reviews.length;
  return (
    reviews.reduce(
      (sum, review) => sum + parseFloat(review[attribute] as string),
      0
    ) / totalReviews
  );
}

export { calculateRatingCount, calculateAverageRating };

import type {
  ExperienceReviewData,
  AccommodationReviewData
} from "@/app/interfaces/types";

async function validateReview(
  data: AccommodationReviewData | ExperienceReviewData
): Promise<Record<string, string | boolean>> {
  for (const [, value] of Object.entries(data)) {
    if (typeof value === "string" && value.trim() === "") {
      return {
        hasError: true,
        message: "Review must not be blank."
      };
    }
    if (typeof value === "number" && (isNaN(value) || value < 1 || value > 5)) {
      return {
        hasError: true,
        message: "Ratings must be between 1 and 5."
      };
    }
  }

  return { hasError: false, message: "Validation successful." };
}

export { validateReview };

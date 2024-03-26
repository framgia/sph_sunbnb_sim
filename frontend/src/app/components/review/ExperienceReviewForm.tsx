"use client";
import { Button, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { type ExperienceReviewData } from "@/app/interfaces/types";
import { validateReview } from "@/app/utils/helpers/review/validation";
import { createExperienceReview } from "@/app/utils/helpers/review/request";
import ErrorMessage from "../ErrorMessage";
import StarsExperienceReview from "./StarsExperienceReview";

interface AddReviewFormProps {
  listingId: number;
  onClose: () => void;
}

const ExperienceReviewForm: React.FC<AddReviewFormProps> = ({
  listingId,
  onClose
}) => {
  const [error, setError] = useState<Record<string, string | boolean>>({
    hasError: false,
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState<ExperienceReviewData>({
    overall_rating: 0,
    comment: ""
  });

  async function handleClick(): Promise<void> {
    console.log(rating);
    const validateData = await validateReview(rating);
    if (validateData.hasError as boolean) {
      setError({
        message: validateData.message,
        hasError: validateData.hasError
      });
    } else {
      setIsLoading(true);
      const result = await createExperienceReview(listingId, rating);
      setIsLoading(false);
      if (result.hasError === true) {
        setError({
          message: result.message,
          hasError: result.hasError
        });
      } else {
        onClose();
      }
    }
  }

  return (
    <>
      <div className="mb-2 flex w-full flex-row px-10">
        <div className="flex flex-col">
          <StarsExperienceReview
            rating={rating}
            field="overall_rating"
            setScore={setRating}
          />
        </div>
      </div>
      <div className="px-5">
        <Textarea
          aria-label="Review Comment"
          className="mt-2"
          maxRows={10}
          minRows={10}
          isInvalid={error.hasError === true && rating.comment.trim() === ""}
          variant="bordered"
          placeholder="Leave a comment..."
          value={rating.comment}
          onChange={(e) => {
            setRating({ ...rating, comment: e.target.value });
          }}
        />
      </div>
      <div>
        {error.hasError === true && (
          <ErrorMessage message={error.message as string} />
        )}
      </div>
      <div className="flex w-full justify-end px-5 py-2">
        <Button
          color="primary"
          variant="solid"
          onClick={handleClick}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default ExperienceReviewForm;

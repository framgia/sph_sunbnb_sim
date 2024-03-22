"use client";
import { Button, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import StarsAddReview from "./StarsAddReview";
import LocationSmallIcon from "../svgs/Review/LocationSmallIcon";
import ValueSmallIcon from "../svgs/Review/ValueSmallIcon";
import CleanlinessSmallIcon from "../svgs/Review/CleanlinessSmallIcon";
import { type ReviewData } from "@/app/interfaces/types";
import { validateReview } from "@/app/utils/helpers/review/validation";
import { createReview } from "@/app/utils/helpers/review/request";
import ErrorMessage from "../ErrorMessage";

interface AddReviewFormProps {
  listingId: number;
  onClose: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({
  listingId,
  onClose
}) => {
  const [error, setError] = useState<Record<string, string | boolean>>({
    hasError: false,
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState<ReviewData>({
    cleanliness_rating: 0,
    location_rating: 0,
    value_rating: 0,
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
      const result = await createReview(listingId, rating);
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
      <div className="mb-2 flex w-full flex-row justify-center">
        <div className="m-5 flex flex-col justify-center">
          <div className="flex w-full justify-center">
            <CleanlinessSmallIcon />
          </div>
          <span className="w-full text-center text-sm">Cleanliness</span>
          <StarsAddReview
            rating={rating}
            field="cleanliness_rating"
            setScore={setRating}
          />
        </div>
        <div className="m-5 flex flex-col justify-center">
          <div className="flex w-full justify-center">
            <ValueSmallIcon />
          </div>
          <span className="w-full text-center text-sm ">Value</span>
          <StarsAddReview
            rating={rating}
            field="location_rating"
            setScore={setRating}
          />
        </div>
        <div className="m-5 flex flex-col justify-center">
          <div className="flex w-full justify-center">
            <LocationSmallIcon />
          </div>
          <span className="w-full text-center text-sm ">Location</span>
          <StarsAddReview
            rating={rating}
            field="value_rating"
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

export default AddReviewForm;

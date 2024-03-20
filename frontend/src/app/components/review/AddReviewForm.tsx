"use client";
import { Button, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import StarsAddReview from "./StarsAddReview";
import LocationSmallIcon from "../svgs/Review/LocationSmallIcon";
import ValueSmallIcon from "../svgs/Review/ValueSmallIcon";
import CleanlinessSmallIcon from "../svgs/Review/CleanlinessSmallIcon";

const AddReviewForm: React.FC = () => {
  const [cleanRating, setClean] = useState(0);
  const [valueRating, setValue] = useState(0);
  const [locationRating, setLocation] = useState(0);

  return (
    <>
      <div className="mb-2 flex w-full flex-row justify-center">
        <div className="m-5 flex flex-col justify-center">
          <div className="flex w-full justify-center">
            <CleanlinessSmallIcon />
          </div>
          <span className="w-full text-center text-sm">Cleanliness</span>
          <StarsAddReview rating={cleanRating} setScore={setClean} />
        </div>
        <div className="m-5 flex flex-col justify-center">
          <div className="flex w-full justify-center">
            <ValueSmallIcon />
          </div>
          <span className="w-full text-center text-sm ">Value</span>
          <StarsAddReview rating={valueRating} setScore={setValue} />
        </div>
        <div className="m-5 flex flex-col justify-center">
          <div className="flex w-full justify-center">
            <LocationSmallIcon />
          </div>
          <span className="w-full text-center text-sm ">Location</span>
          <StarsAddReview rating={locationRating} setScore={setLocation} />
        </div>
      </div>
      <div className="px-5">
        <Textarea
          aria-label="Review Comment"
          className="mt-2"
          maxRows={10}
          minRows={10}
          variant="bordered"
          placeholder="Leave a comment..."
        />
      </div>
      <div className="flex w-full justify-end px-5 py-2">
        <Button color="primary" variant="solid">
          Submit
        </Button>
      </div>
    </>
  );
};

export default AddReviewForm;

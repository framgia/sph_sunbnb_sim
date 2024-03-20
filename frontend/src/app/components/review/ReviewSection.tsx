import React from "react";
import ReviewComponent from "./ReviewComponent";
import ReviewHeader from "./ReviewHeader";
import ReviewPaginate from "./ReviewPaginate";

const ReviewSection: React.FC = () => {
  const reviews = [
    {
      name: "Dean Ambrose",
      created_at: "March 19, 2024",
      overall_rating: 3,
      cleanliness_rating: 5,
      location_rating: 4,
      value_rating: 4,
      comment:
        "Lunatic Fringe Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti hic illum optio numquam, sit consequuntur at fuga quasi ducimus libero, culpa quod tempora deserunt veniam laudantium maxime quas eveniet modi. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti hic illum optio numquam, sit consequuntur at fuga quasi ducimus libero, culpa quod tempora deserunt veniam laudantium maxime quas eveniet modi. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti hic illum optio numquam, sit consequuntur at fuga quasi ducimus libero, culpa quod tempora deserunt veniam laudantium maxime quas eveniet modi."
    },
    {
      name: "Rhea Ripley",
      created_at: "March 19, 2024",
      overall_rating: 4,
      cleanliness_rating: 5,
      location_rating: 3,
      value_rating: 5,
      comment:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti hic illum optio numquam, sit Mami consequuntur at fuga quasi ducimus libero, culpa quod tempora deserunt veniam laudantium maxime quas eveniet modi."
    },
    {
      name: "Cody Rhodes",
      created_at: "March 19, 2024",
      overall_rating: 5,
      cleanliness_rating: 5,
      location_rating: 4,
      value_rating: 4,
      comment:
        "Wrestling has more than one royal family Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti hic illum optio numquam, sit consequuntur at fuga quasi ducimus libero, culpa quod tempora deserunt veniam laudantium maxime quas eveniet modi."
    },
    {
      name: "Daniel Bryan",
      created_at: "March 19, 2024",
      overall_rating: 5,
      cleanliness_rating: 5,
      location_rating: 4,
      value_rating: 4,
      comment:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. YES! YES! YES! Deleniti hic illum optio numquam, sit consequuntur at fuga quasi ducimus libero, culpa quod tempora deserunt veniam laudantium maxime quas eveniet modi."
    }
  ];
  return (
    <>
      <div className="mb-5">
        <span className="text-xl font-semibold">
          {" "}
          Ratings and Reviews ({reviews.length}){" "}
        </span>
      </div>

      {reviews.length <= 0 ? (
        <div className="flex h-40 w-full items-center justify-center">
          <span className="text-zinc-500">No reviews yet.</span>
        </div>
      ) : (
        <>
          <ReviewHeader reviews={reviews} />
          <div className="mt-5 grid grid-cols-2">
            {reviews.map((review, i) => {
              return (
                <div className="mb-5" key={i}>
                  <ReviewComponent
                    name={review.name}
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

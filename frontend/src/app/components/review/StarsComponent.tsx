import React from "react";
import FilledStarIcon from "../svgs/Review/FilledStarIcon";
import StarIcon from "../svgs/Review/StarIcon";

interface StarComponentProps {
  score: number;
}
const StarComponent: React.FC<StarComponentProps> = ({ score }) => {
  return (
    <div className="flex flex-row">
      {[...Array(5)].map((_val, i) => {
        return i < score ? <FilledStarIcon key={i} /> : <StarIcon key={i} />;
      })}
    </div>
  );
};

export default StarComponent;

import { Pagination } from "@nextui-org/react";
import React from "react";

const ReviewPaginate: React.FC = () => {
  return (
    <Pagination
      isCompact
      showControls
      total={1}
      initialPage={1}
      page={1}
      color="primary"
    />
  );
};

export default ReviewPaginate;

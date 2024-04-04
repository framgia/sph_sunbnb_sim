import React from "react";
import ListingsGrid from "./ListingsGrid";

const ListingsPage: React.FC = () => {
  return (
    <>
      <span className="text-2xl font-bold">Listings</span>
      <ListingsGrid />
    </>
  );
};

export default ListingsPage;

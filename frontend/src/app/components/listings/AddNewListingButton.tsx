"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import AddIcon from "../svgs/Listings/AddIcon";
import { type AddNewListingButtonProps } from "@/app/interfaces/ListingsProps";

const ListingHeader: React.FC<AddNewListingButtonProps> = ({ type }) => {
  const router = useRouter();
  return (
    <Button
      color="primary"
      endContent={<AddIcon />}
      className="my-5 self-end"
      onClick={() => {
        router.push(`listings/${type.toLowerCase()}s/new`);
      }}
    >
      Add New
    </Button>
  );
};

export default ListingHeader;

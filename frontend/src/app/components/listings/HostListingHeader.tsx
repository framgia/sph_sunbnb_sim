"use client";
import React from "react";
import { type HostListingHeaderProps } from "@/app/interfaces/ListingsProps";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import AddIcon from "../svgs/Listings/AddIcon";
import ListingSearchBar from "./ListingSearchBar";

const HostListingHeader: React.FC<HostListingHeaderProps> = ({ type }) => {
  const router = useRouter();
  return (
    <div className="my-5 mt-[-20px] flex flex-col">
      <div className="mx-[-9999px] bg-primary py-10 text-center text-4xl font-bold uppercase text-white">
        {type}
      </div>
      <ListingSearchBar />
      <Button
        color="primary"
        endContent={<AddIcon />}
        className="my-5 self-end"
        onClick={() => {
          router.push(`listings/${type}/new`);
        }}
      >
        Add New
      </Button>
    </div>
  );
};

export default HostListingHeader;

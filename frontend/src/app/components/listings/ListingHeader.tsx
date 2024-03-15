"use client";
import React from "react";
import { type ListingHeaderProps } from "@/app/interfaces/HostListingsProps";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import AddIcon from "../svgs/Listings/AddIcon";

const ListingHeader: React.FC<ListingHeaderProps> = ({ type }) => {
  const router = useRouter();
  return (
    <div className="my-5 mt-[-20px] flex flex-col">
      <div className="mx-[-9999px] bg-primary py-10 text-center text-4xl font-bold uppercase text-white">
        {type}
      </div>
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

export default ListingHeader;

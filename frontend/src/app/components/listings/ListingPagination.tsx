"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Pagination
} from "@nextui-org/react";
import ChevronDownIcon from "../svgs/Calendar/ChevronDownIcon";
import { LISTINGS_PAGE_SIZES } from "@/app/interfaces/ListingsProps";
import { type ListingPaginationProps } from "@/app/interfaces/ListingsProps";

const ListingPagination: React.FC<ListingPaginationProps> = ({
  total,
  currentPage,
  perPage,
  type,
  onPageChange,
  onPageSizeChange
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-5 flex w-full items-center justify-between">
        <p className="text-sm capitalize text-zinc-500">{`Total ${total} ${type}`}</p>
        <Dropdown
          classNames={{
            content: "min-w-[25px]"
          }}
        >
          <DropdownTrigger>
            <Button
              variant="light"
              size="sm"
              className="text-sm capitalize text-zinc-500"
              endContent={<ChevronDownIcon />}
            >
              {`Page Size: ${perPage}`}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Per Page Selection"
            classNames={{
              base: "w-20 text-center"
            }}
          >
            {LISTINGS_PAGE_SIZES.map((size) => (
              <DropdownItem
                textValue={size.toString()}
                key={size}
                onClick={() => {
                  onPageSizeChange(size);
                }}
              >
                {size}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <Pagination
        isCompact
        showControls
        total={Math.ceil(total / perPage)}
        initialPage={1}
        page={currentPage}
        color="primary"
        onChange={(page) => {
          onPageChange(page);
        }}
      />
    </div>
  );
};

export default ListingPagination;

"use client";
import React, { useCallback } from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ListingPagination: React.FC<ListingPaginationProps> = ({
  total,
  currentPage,
  perPage,
  type
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handlePageChange = useCallback(
    (page: number): void => {
      const params = new URLSearchParams(searchParams);
      if (type === "accommodations") {
        params.set("apage", page.toString());
      } else {
        params.set("epage", page.toString());
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router, type]
  );

  const handlePageSizeChange = useCallback(
    (size: number): void => {
      const params = new URLSearchParams(searchParams);
      if (type === "accommodations") {
        params.set("asize", size.toString());
        params.set("apage", "1");
      } else {
        params.set("esize", size.toString());
        params.set("epage", "1");
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router, type]
  );
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
                  handlePageSizeChange(size);
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
          handlePageChange(page);
        }}
      />
    </div>
  );
};

export default ListingPagination;

"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { ListingType, UserRole } from "@/app/utils/enums";

const ListingPagination: React.FC<ListingPaginationProps> = ({
  user,
  type,
  total,
  currentPage,
  perPage
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [page, setPage] = useState(currentPage);
  const prefix =
    user === UserRole.GUEST
      ? ""
      : user === UserRole.HOST
        ? type === ListingType.ACCOMMODATION
          ? "a"
          : "e"
        : "";

  const handlePageChange = useCallback(
    (page: number): void => {
      const params = new URLSearchParams(searchParams);
      if (page === 1) params.delete(`${prefix}page`);
      else params.set(`${prefix}page`, page.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname, prefix]
  );

  const handlePageSizeChange = useCallback(
    (size: number): void => {
      const params = new URLSearchParams(searchParams);
      params.set(`${prefix}size`, size.toString());
      params.delete(`${prefix}page`);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, prefix, router, pathname]
  );

  useEffect(() => {
    handlePageChange(Number(page));
  }, [page, handlePageChange]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

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
          setPage(page);
        }}
      />
    </div>
  );
};

export default ListingPagination;

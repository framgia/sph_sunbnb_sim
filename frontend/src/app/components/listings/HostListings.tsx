"use client";
import { type HostListingsProps } from "@/app/interfaces/HostListingsProps";
import React, { useCallback, useEffect, useState } from "react";
import HostListingItem from "./HostListingItem";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination
} from "@nextui-org/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  type Listing,
  type Pagination as PaginationType
} from "@/app/interfaces/types";
import { getAccommodationsByUser } from "@/app/utils/helpers/accommodation/request";
import ChevronDownIcon from "../svgs/Calendar/ChevronDownIcon";

const HostListings: React.FC<HostListingsProps> = ({ page, size, type }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handlePageChange = useCallback(
    (page: number): void => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const handlePageSizeChange = useCallback(
    (size: number): void => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");
      params.set("size", size.toString());
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  useEffect(() => {
    const fetchAccommodations = async (): Promise<void> => {
      const data = await getAccommodationsByUser(page, size);
      if (data !== undefined) {
        setListings(data.listings);
        setPagination(data.pagination);
      }
    };

    fetchAccommodations().catch((error) => {
      console.error("Failed to fetch lisitng availability: ", error);
    });
  }, [page, size]);

  return (
    <div className="flex flex-col items-center">
      {listings.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {listings.map((listing) => (
              <li key={listing.id}>
                <HostListingItem listing={listing} type={type} />
              </li>
            ))}
          </ul>
          {pagination !== null && (
            <>
              <div className="mt-5 flex w-full items-center justify-between">
                <p className="text-sm capitalize text-zinc-500">{`Total ${pagination?.total} ${type}`}</p>
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
                      {`Page Size: ${pagination?.per_page}`}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Per Page Selection"
                    classNames={{
                      base: "w-20 text-center"
                    }}
                  >
                    {[3, 6].map((size) => (
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
                total={Math.ceil(pagination.total / pagination.per_page)}
                initialPage={1}
                page={pagination.current_page}
                color="primary"
                onChange={(page) => {
                  handlePageChange(page);
                }}
              />
            </>
          )}
        </>
      ) : (
        <p className="mx-auto text-center text-zinc-500">
          No listings available.
        </p>
      )}
    </div>
  );
};

export default HostListings;

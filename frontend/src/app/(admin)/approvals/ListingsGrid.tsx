"use client";
import ListingItem from "@/app/components/listings/ListingItem";
import FilterIcon from "@/app/components/svgs/Admin/FilterIcon";
import SearchIcon from "@/app/components/svgs/SearchIcon";
import type { Listing, PaginationType } from "@/app/interfaces/types";
import { UserRole } from "@/app/utils/enums";
import type { ListingType } from "@/app/utils/enums";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Spinner,
  Tab,
  Tabs
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const ListingsGrid: React.FC<{
  listings: Listing[];
  paginate?: PaginationType | null;
  page?: number;
}> = ({ listings, paginate, page }) => {
  const [listingsState, setListings] = useState(listings);
  const [paginateState, setPaginate] = useState(paginate);
  const [selectedOption, setSelectedOption] = useState("All");
  const [pageState, setPageState] = useState(Number(page) ?? 1);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    if (pageState === 1) params.delete("page");
    else params.set("page", pageState.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
<<<<<<< HEAD
  }, [page, pathname, searchParams, router]);

  useEffect(() => {
    setLoading(false);
    const newListings = listings.filter((listing, _i) => {
      return listing.listable_type.split("\\")[2] === type;
    });
    setFListings(newListings);
  }, [type, listingsState, listings]);
=======
  }, [pageState, pathname, searchParams, router]);
>>>>>>> 89ddb4108c7c0a7dcf70d63250f43779bdc8e421

  useEffect(() => {
    setLoading(false);
    setListings(listings);
    setPaginate(paginate);
  }, [listings, router, paginate]);

  const handleListingType = useCallback(
    (type: string) => {
      const params = new URLSearchParams(searchParams);
      if (type === "Accommodation") params.delete("listableType");
      else params.set("listableType", type.toString());
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router]
  );

  const handleStatusType = useCallback(
    (status: string) => {
      const params = new URLSearchParams(searchParams);
      if (status === "All") params.delete("status");
      else params.set("status", status);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      setSelectedOption(status);
    },
    [pathname, searchParams, router, setSelectedOption]
  );

  const handleSearch = useCallback(
    (query: string) => {
      setLoading(true);
      const params = new URLSearchParams(searchParams);
      if (query !== "") params.set("query", query);
      else params.delete("query");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router]
  );

  return (
    <div>
      <div className="my-5 flex w-full flex-row justify-between">
        <div className="flex w-3/4 flex-row">
          <Input
            placeholder="Search"
            size="sm"
            startContent={<SearchIcon />}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
        <div className="flex w-1/4 justify-end">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="bg-white text-foreground-500"
                startContent={<FilterIcon />}
              >
                Status: {selectedOption}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Status Filter">
              <DropdownItem
                onPress={() => {
                  handleStatusType("Pending");
                }}
              >
                Pending
              </DropdownItem>
              <DropdownItem
                onPress={() => {
                  handleStatusType("Active");
                }}
              >
                Active
              </DropdownItem>
              <DropdownItem
                onPress={() => {
                  handleStatusType("Refused");
                }}
              >
                Refused
              </DropdownItem>
              <DropdownItem
                onPress={() => {
                  handleStatusType("All");
                }}
              >
                All
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="mb-5 flex w-full justify-center gap-4">
        <Tabs
          selectedKey={searchParams.get("listableType") ?? "Accommodation"}
          variant="underlined"
          color="primary"
          onSelectionChange={(key) => {
            handleListingType(key as ListingType);
          }}
        >
          <Tab key={"Accommodation"} title="Accommodation" />
          <Tab key={"Experience"} title="Experience" />
        </Tabs>
      </div>
      {!isLoading ? (
        <div className="grid grid-cols-3 gap-5">
          {listingsState.length <= 0 ? (
            <div className="col-span-3 my-10 flex w-full justify-center">
              <span className=" text-foreground-500">No listings found</span>
            </div>
          ) : (
            listingsState.map((listing, i) => {
              return (
                <div className="rounded-xl shadow-lg" key={i}>
                  <ListingItem
                    key={i}
                    user={UserRole.ADMIN}
                    listing={listing}
                    type={listing.listable_type.split("\\")[2] as ListingType}
                  />
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="flex h-56 w-full justify-center">
          <Spinner />
        </div>
      )}
      <div className="mt-10 flex w-full justify-center">
        <Pagination
          showControls
          total={Math.ceil(
            (paginateState?.total ?? 0) / (paginateState?.per_page ?? 1)
          )}
          page={pageState}
          onChange={(page) => {
            setPageState(page);
          }}
        />
      </div>
    </div>
  );
};

export default ListingsGrid;

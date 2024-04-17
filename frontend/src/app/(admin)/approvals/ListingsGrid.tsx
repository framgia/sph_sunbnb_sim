"use client";
import AdminApprovalFilter from "@/app/components/admin/AdminApprovalFilter";
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
  }, [pageState, pathname, searchParams, router]);

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
      <div className=" flex w-full flex-wrap gap-4 md:flex-nowrap">
        <Input
          placeholder="Search"
          size="sm"
          startContent={<SearchIcon />}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
      <div className="flex w-full justify-between">
        <div className="mb-5 mt-5 text-2xl font-bold">Listings</div>
        <AdminApprovalFilter
          selectedOption={selectedOption}
          handleStatusType={handleStatusType}
        />
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
        <div className="gap-5 md:grid md:grid-cols-3">
          {listingsState.length <= 0 ? (
            <div className="col-span-3 my-10 flex w-full justify-center">
              <span className=" text-foreground-500">No listings found</span>
            </div>
          ) : (
            listingsState.map((listing, i) => {
              return (
                <div className="m-4 rounded-xl shadow-lg md:m-0" key={i}>
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

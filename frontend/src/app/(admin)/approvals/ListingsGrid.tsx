"use client";
import ListingItem from "@/app/components/listings/ListingItem";
import FilterIcon from "@/app/components/svgs/Admin/FilterIcon";
import SearchIcon from "@/app/components/svgs/SearchIcon";
import type { Listing, PaginationType } from "@/app/interfaces/types";
import { ListingType, UserRole } from "@/app/utils/enums";
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
import React, { useEffect, useState } from "react";

const ListingsGrid: React.FC<{
  listings: Listing[];
  paginate?: PaginationType | null;
}> = ({ listings, paginate }) => {
  const [type, setType] = useState(ListingType.ACCOMMODATION);

  //  filter is still improper must be changed to props instead of state on integration
  const [listingsState, setListings] = useState(listings);
  const [filteredListings, setFListings] = useState<Listing[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    if (page === 1) params.delete("page");
    else params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [page, pathname, searchParams, router]);

  useEffect(() => {
    setLoading(false);
    const newListings = listings.filter((listing, _i) => {
      console.log(listing.listable_type.split("\\")[2], "===", type);
      return listing.listable_type.split("\\")[2] === type;
    });
    setFListings(newListings);
  }, [type, listingsState, listings]);

  useEffect(() => {
    setLoading(false);
    setListings(listings);
  }, [listings, router]);

  return (
    <div>
      <div className="my-5 flex w-full flex-row justify-between">
        <div className="flex w-3/4 flex-row">
          <Input
            placeholder="Search"
            size="sm"
            startContent={<SearchIcon />}
            endContent={
              <Button variant="solid" color="primary">
                Search
              </Button>
            }
          />
        </div>
        <div className="flex w-1/4 justify-end">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="bg-white text-foreground-500"
                startContent={<FilterIcon />}
              >
                Filter
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>Pending</DropdownItem>
              <DropdownItem>Active</DropdownItem>
              <DropdownItem>Refused</DropdownItem>
              <DropdownItem>All</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="mb-5 flex w-full justify-center gap-4">
        <Tabs
          selectedKey={type}
          variant="underlined"
          color="primary"
          onSelectionChange={(key) => {
            setType(key as unknown as ListingType);
          }}
        >
          <Tab key={"Accommodation"} title="Accommodation" />
          <Tab key={"Experience"} title="Experience" />
        </Tabs>
      </div>
      {!isLoading ? (
        <div className="grid grid-cols-3 gap-5">
          {filteredListings.length <= 0 ? (
            <div className="col-span-3 my-10 flex w-full justify-center">
              <span className=" text-foreground-500">No listings found</span>
            </div>
          ) : (
            filteredListings.map((listing, i) => {
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
          total={Math.ceil((paginate?.total ?? 0) / (paginate?.per_page ?? 1))}
          page={page}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default ListingsGrid;

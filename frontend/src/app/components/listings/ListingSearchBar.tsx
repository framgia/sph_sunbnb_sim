"use client";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider
} from "@nextui-org/react";
import React, { useCallback, useState } from "react";
import ChevronDownIcon from "../svgs/Calendar/ChevronDownIcon";
import SearchIcon from "../svgs/SearchIcon";
import { DateRange } from "react-date-range";
import {
  INITIAL_FILTER,
  MIN_PRICE,
  MAX_PRICE,
  MIN_RATING,
  MAX_RATING,
  MIN_DATE
} from "@/app/interfaces/ListingsProps";
import { type ListingFilter } from "@/app/interfaces/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ListingSearchBar: React.FC = () => {
  const [filters, setFilters] = useState<ListingFilter>(INITIAL_FILTER);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilterChange = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    if (filters.query !== "") params.set("query", filters.query);
    else params.delete("query");
    if (filters.price.min !== MIN_PRICE || filters.price.max !== MAX_PRICE)
      params.set("price", `${filters.price.min}-${filters.price.max}`);
    else params.delete("price");
    if (filters.rating.min !== MIN_RATING || filters.rating.max !== MAX_RATING)
      params.set("rating", `${filters.rating.min}-${filters.rating.max}`);
    else params.delete("rating");
    if (
      filters.date[0].startDate !== MIN_DATE &&
      filters.date[0].endDate !== undefined
    )
      params.set(
        "date",
        `${filters.date[0].startDate.toISOString().slice(0, 10)}:${filters.date[0].endDate.toISOString().slice(0, 10)}`
      );
    else params.delete("date");

    router.replace(`${pathname}?${params.toString()}`);
  }, [filters, pathname, router, searchParams]);

  const handleFilterClear = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    setFilters(INITIAL_FILTER);

    params.delete("query");
    params.delete("price");
    params.delete("rating");
    params.delete("date");

    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  return (
    <div className="mt-[-20px] flex items-center rounded-lg bg-white px-2 shadow-md">
      <Input
        size="sm"
        placeholder="Search"
        fullWidth
        classNames={{
          input: ["bg-white"],
          inputWrapper: [
            "bg-white",
            "data-[hover=true]:bg-white",
            "group-data-[focus=true]:bg-white"
          ],
          innerWrapper: ["bg-white"]
        }}
        startContent={<SearchIcon width={14} height={14} />}
        value={filters.query}
        onChange={(e) => {
          setFilters({ ...filters, query: e.target.value });
        }}
      />
      <Popover placement="bottom" showArrow offset={10}>
        <PopoverTrigger>
          <Button
            variant="light"
            size="lg"
            fullWidth
            className="max-w-40 justify-between rounded-none border-x text-sm capitalize text-zinc-500"
            endContent={<ChevronDownIcon />}
          >
            Price
          </Button>
        </PopoverTrigger>
        <PopoverContent className="h-20 w-96">
          <Slider
            label="Price Range"
            step={10000}
            size="sm"
            showSteps
            minValue={MIN_PRICE}
            maxValue={MAX_PRICE}
            value={[filters.price.min, filters.price.max]}
            formatOptions={{ style: "currency", currency: "PHP" }}
            className="max-w-md p-1"
            onChange={(price) => {
              if (Array.isArray(price) && price.length === 2)
                setFilters({
                  ...filters,
                  price: { min: price[0], max: price[1] }
                });
            }}
          />
        </PopoverContent>
      </Popover>
      <Popover placement="bottom" showArrow offset={10}>
        <PopoverTrigger>
          <Button
            variant="light"
            size="lg"
            fullWidth
            className="max-w-40  justify-between rounded-none border-x text-sm capitalize text-zinc-500"
            endContent={<ChevronDownIcon />}
          >
            Ratings
          </Button>
        </PopoverTrigger>
        <PopoverContent className="h-20 w-96">
          <Slider
            label="Rating Range"
            step={1}
            size="sm"
            showSteps
            minValue={MIN_RATING}
            maxValue={MAX_RATING}
            value={[filters.rating.min, filters.rating.max]}
            getValue={(rating) => `${String(rating).replace(",", "-")} Stars`}
            className="max-w-md p-1"
            onChange={(rating) => {
              if (Array.isArray(rating) && rating.length === 2)
                setFilters({
                  ...filters,
                  rating: { min: rating[0], max: rating[1] }
                });
            }}
          />
        </PopoverContent>
      </Popover>
      <Popover placement="bottom" showArrow offset={10}>
        <PopoverTrigger>
          <Button
            variant="light"
            size="lg"
            fullWidth
            className="max-w-40  justify-between rounded-none border-x text-sm capitalize text-zinc-500"
            endContent={<ChevronDownIcon />}
          >
            Date
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <DateRange
            onChange={(date) => {
              if (date.selection.startDate !== undefined) {
                setFilters({
                  ...filters,
                  date: [
                    {
                      startDate: date.selection.startDate,
                      endDate: date.selection.endDate,
                      key: "selection"
                    }
                  ]
                });
              }
            }}
            moveRangeOnFirstSelection={false}
            ranges={filters.date}
            minDate={MIN_DATE}
            rangeColors={["#FF2200"]}
          />
        </PopoverContent>
      </Popover>
      <Button
        color="primary"
        size="sm"
        className="ms-2"
        onClick={handleFilterChange}
      >
        FILTER
      </Button>
      <Button size="sm" className="ms-2" onClick={handleFilterClear}>
        CLEAR
      </Button>
    </div>
  );
};

export default ListingSearchBar;

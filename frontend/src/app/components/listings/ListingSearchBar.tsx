"use client";
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
  MIN_DATE,
  type ListingSearchBarProps
} from "@/app/interfaces/ListingsProps";
import { type ListingFilter } from "@/app/interfaces/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AccommodationType,
  ExperienceType,
  ListingStatus,
  ListingType,
  UserRole
} from "@/app/utils/enums";
import { formatDate } from "@/app/utils/date";

const ListingSearchBar: React.FC<ListingSearchBarProps> = ({ user, type }) => {
  const [filters, setFilters] = useState<ListingFilter>(INITIAL_FILTER);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const prefix =
    user === UserRole.GUEST
      ? ""
      : user === UserRole.HOST
        ? type === ListingType.ACCOMMODATION
          ? "a"
          : "e"
        : "";

  const handleFilterChange = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    if (filters.query !== "") params.set(`${prefix}query`, filters.query);
    else params.delete(`${prefix}query`);

    if (filters.price.min !== MIN_PRICE || filters.price.max !== MAX_PRICE)
      params.set(`${prefix}price`, `${filters.price.min}-${filters.price.max}`);
    else params.delete(`${prefix}price`);

    if (filters.rating.min !== MIN_RATING || filters.rating.max !== MAX_RATING)
      params.set(
        `${prefix}rating`,
        `${filters.rating.min}-${filters.rating.max}`
      );
    else params.delete(`${prefix}rating`);

    if (
      filters.date[0].startDate !== undefined &&
      filters.date[0].startDate !== MIN_DATE &&
      filters.date[0].endDate !== undefined
    ) {
      console.log(filters.date[0].startDate);
      params.set(
        `${prefix}date`,
        `${formatDate(filters.date[0].startDate)}:${formatDate(filters.date[0].endDate)}`
      );
    } else params.delete(`${prefix}date`);

    if (filters.status !== "all") params.set(`${prefix}status`, filters.status);
    else params.delete(`${prefix}status`);

    if (user === UserRole.HOST)
      if (filters.type !== "all") params.set(`${prefix}type`, filters.type);
      else params.delete(`${prefix}type`);

    params.delete(`${prefix}page`);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filters, pathname, router, searchParams, prefix, user]);

  const handleFilterClear = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    setFilters(INITIAL_FILTER);
    params.delete(`${prefix}page`);
    params.delete(`${prefix}query`);
    params.delete(`${prefix}price`);
    params.delete(`${prefix}rating`);
    params.delete(`${prefix}date`);
    params.delete(`${prefix}status`);

    if (user === UserRole.HOST) params.delete(`${prefix}type`);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams, prefix, user]);

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
        <Badge
          color="default"
          size="lg"
          shape="circle"
          content=""
          isInvisible={searchParams.get(`${prefix}price`) === null}
        >
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
        </Badge>
        <PopoverContent className="h-20 w-96">
          <Slider
            label="Price Range"
            size="sm"
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
      {user === UserRole.GUEST ? (
        <>
          <Popover placement="bottom" showArrow offset={10}>
            <Badge
              color="default"
              size="lg"
              shape="circle"
              content=""
              isInvisible={searchParams.get(`${prefix}rating`) === null}
            >
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
            </Badge>
            <PopoverContent className="h-20 w-96">
              <Slider
                label="Rating Range"
                step={1}
                size="sm"
                showSteps
                minValue={MIN_RATING}
                maxValue={MAX_RATING}
                value={[filters.rating.min, filters.rating.max]}
                getValue={(rating) =>
                  `${String(rating).replace(",", "-")} Stars`
                }
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
            <Badge
              color="default"
              size="lg"
              shape="circle"
              content=""
              isInvisible={searchParams.get(`${prefix}date`) === null}
            >
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
            </Badge>
            <PopoverContent>
              <DateRange
                onChange={(date) => {
                  console.log(date);
                  setFilters({
                    ...filters,
                    date: [date.selection]
                  });
                }}
                moveRangeOnFirstSelection={false}
                ranges={filters.date}
                minDate={MIN_DATE}
                rangeColors={["#FF2200"]}
              />
            </PopoverContent>
          </Popover>
        </>
      ) : null}
      {user === UserRole.HOST ? (
        <>
          <Dropdown>
            <Badge
              color="default"
              size="lg"
              shape="circle"
              content=""
              isInvisible={searchParams.get(`${prefix}status`) === null}
            >
              <DropdownTrigger>
                <Button
                  variant="light"
                  size="lg"
                  fullWidth
                  className="max-w-40  justify-between rounded-none border-x text-sm capitalize text-zinc-500"
                  endContent={<ChevronDownIcon />}
                >
                  Status
                </Button>
              </DropdownTrigger>
            </Badge>
            <DropdownMenu aria-label="Status">
              {Object.values(ListingStatus).map((status, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => {
                    setFilters({ ...filters, status });
                  }}
                  className={
                    filters.status === status ? "bg-primary text-white" : ""
                  }
                >
                  {status}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <Badge
              color="default"
              size="lg"
              shape="circle"
              content=""
              isInvisible={searchParams.get(`${prefix}type`) === null}
            >
              <DropdownTrigger>
                <Button
                  variant="light"
                  size="lg"
                  fullWidth
                  className="max-w-40  justify-between rounded-none border-x text-sm capitalize text-zinc-500"
                  endContent={<ChevronDownIcon />}
                >
                  Type
                </Button>
              </DropdownTrigger>
            </Badge>
            <DropdownMenu
              aria-label="Type"
              className="max-h-52 overflow-y-auto"
            >
              {Object.values(
                type === ListingType.ACCOMMODATION
                  ? AccommodationType
                  : ExperienceType
              ).map((listingType, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => {
                    setFilters({ ...filters, type: listingType });
                  }}
                  className={
                    filters.type === listingType ? "bg-primary text-white" : ""
                  }
                >
                  {listingType}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </>
      ) : null}
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

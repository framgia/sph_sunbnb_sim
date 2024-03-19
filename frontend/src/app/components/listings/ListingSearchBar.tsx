import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider
} from "@nextui-org/react";
import React, { useState } from "react";
import ChevronDownIcon from "../svgs/Calendar/ChevronDownIcon";
import SearchIcon from "../svgs/SearchIcon";
import { DateRange, type Range } from "react-date-range";

const ListingSearchBar: React.FC = () => {
  const [dates, setDates] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: "selection"
    }
  ]);

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
            minValue={0}
            maxValue={100000}
            defaultValue={[0, 100000]}
            formatOptions={{ style: "currency", currency: "PHP" }}
            className="max-w-md p-1"
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
            minValue={0}
            maxValue={5}
            defaultValue={[0, 5]}
            getValue={(rating) => `${String(rating).replace(",", "-")} Stars`}
            className="max-w-md p-1"
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
            onChange={(item) => {
              setDates([item.selection]);
            }}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            minDate={new Date()}
            rangeColors={["#FF2200"]}
          />
        </PopoverContent>
      </Popover>
      <Button color="primary" size="sm" className="ms-2">
        FILTER
      </Button>
    </div>
  );
};

export default ListingSearchBar;

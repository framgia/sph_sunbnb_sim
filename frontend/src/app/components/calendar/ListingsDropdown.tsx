import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import React from "react";
import ChevronDownIcon from "../svgs/Calendar/ChevronDownIcon";
import { truncate } from "@/app/utils/string";
import { type ListingDropdownProps } from "@/app/interfaces/CalendarProps";

const ListingsDropdown: React.FC<ListingDropdownProps> = ({
  listings,
  selectedListing,
  onSelect
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          color="primary"
          className="w-60"
          endContent={<ChevronDownIcon />}
        >
          {truncate(selectedListing.name, 25)}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Listings Names"
        className="max-h-52 w-60 overflow-y-auto overflow-x-hidden"
      >
        {listings.map((listing, index) => (
          <DropdownItem
            key={index}
            onClick={() => {
              onSelect(listing);
            }}
          >
            {listing.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ListingsDropdown;

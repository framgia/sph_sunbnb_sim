import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import React from "react";
import ChevronDownIcon from "../svgs/Calendar/ChevronDownIcon";
import { truncate } from "@/app/utils/helpers/string";
import { type ListingDropdownProps } from "@/app/interfaces/ListingDropdownProps";

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
          className="w-52"
          endContent={<ChevronDownIcon />}
        >
          {truncate(selectedListing, 20)}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Listings Names"
        className="max-h-52 max-w-52 overflow-y-auto overflow-x-hidden"
      >
        {listings.map((listing, index) => (
          <DropdownItem
            key={index}
            onClick={() => {
              onSelect(listing);
            }}
          >
            {listing}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ListingsDropdown;

"use client";
import ListingItem from "@/app/components/listings/ListingItem";
import FilterIcon from "@/app/components/svgs/Admin/FilterIcon";
import SearchIcon from "@/app/components/svgs/SearchIcon";
import { Listing } from "@/app/interfaces/types";
import { ListingStatus, ListingType, UserRole } from "@/app/utils/enums";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Tab,
  Tabs
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

const ListingsGrid: React.FC = () => {
  const listings: Listing[] = [
    {
      id: 2,
      user_id: 4,
      status: ListingStatus.PENDING,
      name: "My Experience",
      description: "A very cool tour.",
      province: "Cebu",
      city: "Cebu City",
      barangay: "Basak San Nicolas",
      street: "Bontores Street",
      zip_code: 6000,
      price: 5000.0,
      maximum_guests: 5,
      listable_type: "App\\Models\\Experience",
      listable_id: 2,
      created_at: new Date("2024-04-04T03:34:22.000000Z"),
      updated_at: new Date("2024-04-04T03:34:22.000000Z"),
      deleted_at: null,
      media: [
        {
          id: 2,
          listing_id: 2,
          media:
            "https://utfs.io/f/708298d7-aad9-491e-85c3-82f9cd0a79e3-g47goy.jpg",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        },
        {
          id: 3,
          listing_id: 2,
          media:
            "https://utfs.io/f/ca88b394-c700-4cae-8176-6fe8d8b838b1-5nw4vb.png",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        },
        {
          id: 4,
          listing_id: 2,
          media:
            "https://utfs.io/f/f5532a6f-e721-4458-9ffe-2ced484b7188-2487m.jpg",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        }
      ],
      user: {
        id: 2,
        first_name: "Aracs",
        last_name: "Encabo",
        role: UserRole.HOST,
        status: "active",
        email: "userguest@example.com",
        created_at: "2024-04-01T03:22:35.000000Z",
        updated_at: "2024-04-01T03:22:35.000000Z"
      }
    },
    {
      id: 2,
      user_id: 4,
      status: ListingStatus.PENDING,
      name: "My Experience 2",
      description: "A very cool tour.",
      province: "Cebu",
      city: "Cebu City",
      barangay: "Basak San Nicolas",
      street: "Bontores Street",
      zip_code: 6000,
      price: 5000.0,
      maximum_guests: 5,
      listable_type: "App\\Models\\Experience",
      listable_id: 2,
      created_at: new Date("2024-04-04T03:34:22.000000Z"),
      updated_at: new Date("2024-04-04T03:34:22.000000Z"),
      deleted_at: null,
      media: [
        {
          id: 2,
          listing_id: 2,
          media:
            "https://utfs.io/f/708298d7-aad9-491e-85c3-82f9cd0a79e3-g47goy.jpg",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        },
        {
          id: 3,
          listing_id: 2,
          media:
            "https://utfs.io/f/ca88b394-c700-4cae-8176-6fe8d8b838b1-5nw4vb.png",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        },
        {
          id: 4,
          listing_id: 2,
          media:
            "https://utfs.io/f/f5532a6f-e721-4458-9ffe-2ced484b7188-2487m.jpg",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        }
      ],
      user: {
        id: 2,
        first_name: "Aracs",
        last_name: "Encabo",
        role: UserRole.HOST,
        status: "active",
        email: "userguest@example.com",
        created_at: "2024-04-01T03:22:35.000000Z",
        updated_at: "2024-04-01T03:22:35.000000Z"
      }
    },
    {
      id: 2,
      user_id: 4,
      status: ListingStatus.PENDING,
      name: "My Experience 3",
      description: "A very cool tour.",
      province: "Cebu",
      city: "Cebu City",
      barangay: "Basak San Nicolas",
      street: "Bontores Street",
      zip_code: 6000,
      price: 5000.0,
      maximum_guests: 5,
      listable_type: "App\\Models\\Experience",
      listable_id: 2,
      created_at: new Date("2024-04-04T03:34:22.000000Z"),
      updated_at: new Date("2024-04-04T03:34:22.000000Z"),
      deleted_at: null,
      media: [
        {
          id: 2,
          listing_id: 2,
          media:
            "https://utfs.io/f/708298d7-aad9-491e-85c3-82f9cd0a79e3-g47goy.jpg",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        },
        {
          id: 3,
          listing_id: 2,
          media:
            "https://utfs.io/f/ca88b394-c700-4cae-8176-6fe8d8b838b1-5nw4vb.png",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        },
        {
          id: 4,
          listing_id: 2,
          media:
            "https://utfs.io/f/f5532a6f-e721-4458-9ffe-2ced484b7188-2487m.jpg",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        }
      ],
      user: {
        id: 2,
        first_name: "Aracs",
        last_name: "Encabo",
        role: UserRole.HOST,
        status: "active",
        email: "userguest@example.com",
        created_at: "2024-04-01T03:22:35.000000Z",
        updated_at: "2024-04-01T03:22:35.000000Z"
      }
    },
    {
      id: 2,
      user_id: 4,
      status: ListingStatus.PENDING,
      name: "My Accommodation",
      description: "A very cool tour.",
      province: "Cebu",
      city: "Cebu City",
      barangay: "Basak San Nicolas",
      street: "Bontores Street",
      zip_code: 6000,
      price: 5000.0,
      maximum_guests: 5,
      listable_type: "App\\Models\\Accommodation",
      listable_id: 2,
      created_at: new Date("2024-04-04T03:34:22.000000Z"),
      updated_at: new Date("2024-04-04T03:34:22.000000Z"),
      deleted_at: null,
      media: [
        {
          id: 2,
          listing_id: 2,
          media:
            "https://utfs.io/f/708298d7-aad9-491e-85c3-82f9cd0a79e3-g47goy.jpg",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        },
        {
          id: 3,
          listing_id: 2,
          media:
            "https://utfs.io/f/ca88b394-c700-4cae-8176-6fe8d8b838b1-5nw4vb.png",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        },
        {
          id: 4,
          listing_id: 2,
          media:
            "https://utfs.io/f/f5532a6f-e721-4458-9ffe-2ced484b7188-2487m.jpg",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        }
      ],
      user: {
        id: 2,
        first_name: "Aracs",
        last_name: "Encabo",
        role: UserRole.HOST,
        status: "active",
        email: "userguest@example.com",
        created_at: "2024-04-01T03:22:35.000000Z",
        updated_at: "2024-04-01T03:22:35.000000Z"
      }
    },
    {
      id: 2,
      user_id: 4,
      status: ListingStatus.PENDING,
      name: "My Accommodation 2",
      description: "A very cool tour.",
      province: "Cebu",
      city: "Cebu City",
      barangay: "Basak San Nicolas",
      street: "Bontores Street",
      zip_code: 6000,
      price: 5000.0,
      maximum_guests: 5,
      listable_type: "App\\Models\\Accommodation",
      listable_id: 2,
      created_at: new Date("2024-04-04T03:34:22.000000Z"),
      updated_at: new Date("2024-04-04T03:34:22.000000Z"),
      deleted_at: null,
      media: [
        {
          id: 2,
          listing_id: 2,
          media:
            "https://utfs.io/f/708298d7-aad9-491e-85c3-82f9cd0a79e3-g47goy.jpg",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        },
        {
          id: 3,
          listing_id: 2,
          media:
            "https://utfs.io/f/ca88b394-c700-4cae-8176-6fe8d8b838b1-5nw4vb.png",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        },
        {
          id: 4,
          listing_id: 2,
          media:
            "https://utfs.io/f/f5532a6f-e721-4458-9ffe-2ced484b7188-2487m.jpg",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        }
      ],
      user: {
        id: 2,
        first_name: "Aracs",
        last_name: "Encabo",
        role: UserRole.HOST,
        status: "active",
        email: "userguest@example.com",
        created_at: "2024-04-01T03:22:35.000000Z",
        updated_at: "2024-04-01T03:22:35.000000Z"
      }
    },
    {
      id: 2,
      user_id: 4,
      status: ListingStatus.REFUSED,
      name: "My Experience 5",
      description: "A very cool tour.",
      province: "Cebu",
      city: "Cebu City",
      barangay: "Basak San Nicolas",
      street: "Bontores Street",
      zip_code: 6000,
      price: 5000.0,
      maximum_guests: 5,
      listable_type: "App\\Models\\Experience",
      listable_id: 2,
      created_at: new Date("2024-04-04T03:34:22.000000Z"),
      updated_at: new Date("2024-04-04T03:34:22.000000Z"),
      deleted_at: null,
      media: [
        {
          id: 2,
          listing_id: 2,
          media:
            "https://utfs.io/f/708298d7-aad9-491e-85c3-82f9cd0a79e3-g47goy.jpg",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        },
        {
          id: 3,
          listing_id: 2,
          media:
            "https://utfs.io/f/ca88b394-c700-4cae-8176-6fe8d8b838b1-5nw4vb.png",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        },
        {
          id: 4,
          listing_id: 2,
          media:
            "https://utfs.io/f/f5532a6f-e721-4458-9ffe-2ced484b7188-2487m.jpg",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        }
      ],
      user: {
        id: 2,
        first_name: "Aracs",
        last_name: "Encabo",
        role: UserRole.HOST,
        status: "active",
        email: "userguest@example.com",
        created_at: "2024-04-01T03:22:35.000000Z",
        updated_at: "2024-04-01T03:22:35.000000Z"
      }
    },
    {
      id: 2,
      user_id: 4,
      status: ListingStatus.ACTIVE,
      name: "My Experience 8",
      description: "A very cool tour.",
      province: "Cebu",
      city: "Cebu City",
      barangay: "Basak San Nicolas",
      street: "Bontores Street",
      zip_code: 6000,
      price: 5000.0,
      maximum_guests: 5,
      listable_type: "App\\Models\\Experience",
      listable_id: 2,
      created_at: new Date("2024-04-04T03:34:22.000000Z"),
      updated_at: new Date("2024-04-04T03:34:22.000000Z"),
      deleted_at: null,
      media: [
        {
          id: 2,
          listing_id: 2,
          media:
            "https://utfs.io/f/708298d7-aad9-491e-85c3-82f9cd0a79e3-g47goy.jpg",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        },
        {
          id: 3,
          listing_id: 2,
          media:
            "https://utfs.io/f/ca88b394-c700-4cae-8176-6fe8d8b838b1-5nw4vb.png",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        },
        {
          id: 4,
          listing_id: 2,
          media:
            "https://utfs.io/f/f5532a6f-e721-4458-9ffe-2ced484b7188-2487m.jpg",
          created_at: "2024-04-04T03:34:22.000000Z",
          updated_at: "2024-04-04T03:34:22.000000Z",
          deleted_at: null
        }
      ],
      user: {
        id: 2,
        first_name: "Aracs",
        last_name: "Encabo",
        role: UserRole.HOST,
        status: "active",
        email: "userguest@example.com",
        created_at: "2024-04-01T03:22:35.000000Z",
        updated_at: "2024-04-01T03:22:35.000000Z"
      }
    }
  ];
  const [type, setType] = useState(ListingType.ACCOMMODATION);

  //    filtering to be changed into search params on integration
  const [filteredListings, setFListings] = useState(listings);
  useEffect(() => {
    const newListings = listings.filter((listing, _i) => {
      console.log(listing.listable_type.split("\\")[2], "===", type);
      return listing.listable_type.split("\\")[2] === type;
    });
    setFListings(newListings);
  }, [type]);

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
      <div className="grid grid-cols-3 gap-5">
        {filteredListings.map((listing, i) => {
          return (
            <div className="rounded-xl shadow-lg" key={i}>
              <ListingItem
                key={i}
                user={UserRole.HOST}
                listing={listing}
                type={listing.listable_type.split("\\")[2] as ListingType}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-10 flex w-full justify-center">
        <Pagination showControls total={1} initialPage={1} />
      </div>
    </div>
  );
};

export default ListingsGrid;

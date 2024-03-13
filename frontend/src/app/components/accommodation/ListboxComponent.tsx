import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import type { Accommodation } from "@/app/interfaces/AccomodationData";
import { Amenity } from "@/app/utils/enums";

interface ListboxProps {
  data: Accommodation;
  setData: React.Dispatch<React.SetStateAction<Accommodation>>;
}

const ListboxComponent: React.FC<ListboxProps> = ({ data, setData }) => {
  const options = new Map<Amenity, string>();
  Object.values(Amenity).forEach((amenity) => {
    options.set(amenity, amenity);
  });

  const selectedValues = Array.from(data.amenities)
    .map((key) => key.toString())
    .join(", ");

  return (
    <div className="pr-0 md:pr-10">
      <div className="w-full rounded-small border-small border-default-200 px-1 py-2 dark:border-default-100">
        <Listbox
          className="h-72 overflow-auto rounded-small px-1 py-2 "
          aria-label="Multiple selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={data.amenities}
          onSelectionChange={(keys) => {
            setData((prevData) => ({
              ...prevData,
              amenities: Array.from(keys) as Amenity[]
            }));
          }}
        >
          {Array.from(options).map(([key, value]) => (
            <ListboxItem key={key}>{value}</ListboxItem>
          ))}
        </Listbox>
      </div>
      <p className="mt-1 text-sm font-bold">Your Amenities:</p>
      <p className="mb-10 text-xs text-default-500">{selectedValues}</p>
    </div>
  );
};

export default ListboxComponent;

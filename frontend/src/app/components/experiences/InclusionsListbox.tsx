import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Experience } from "@/app/interfaces/ExperienceData";
import { Inclusion } from "@/app/utils/enums";
import ExperienceCounter from "../experience/ExperienceCounter";

interface ListboxProps {
  data: Experience;
  setData: React.Dispatch<React.SetStateAction<Experience>>;
}

const InclusionsListbox: React.FC<ListboxProps> = ({ data, setData }) => {
  const options = new Map<Inclusion, string>();
  Object.values(Inclusion).forEach((inclusion) => {
    options.set(inclusion, inclusion);
  });

  const selectedValues = Array.from(data.inclusions)
    .map((key) => key.toString())
    .join(", ");

  return (
    <>
      <div className="pr-0 md:pr-10">
        <div className="w-full rounded-small border-small border-default-200 px-1 py-2 dark:border-default-100">
          <Listbox
            className="h-40 overflow-auto rounded-small px-1 py-2 "
            aria-label="Multiple selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="multiple"
            selectedKeys={data.inclusions}
            onSelectionChange={(keys) => {
              setData((prevData) => ({
                ...prevData,
                inclusions: Array.from(keys) as Inclusion[]
              }));
            }}
          >
            {Array.from(options).map(([key, value]) => (
              <ListboxItem key={key}>{value}</ListboxItem>
            ))}
          </Listbox>
        </div>
        <p className="mt-1 text-sm font-bold">Your Inclusions:</p>
        <p className="mb-10 text-xs text-default-500">{selectedValues}</p>

        <p>Maximum Guests</p>
        <ExperienceCounter
          name="Guests"
          data={data}
          setData={setData}
          id="maximum_guests"
        />
      </div>
    </>
  );
};

export default InclusionsListbox;

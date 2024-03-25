import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Experience } from "@/app/interfaces/ExperienceData";
import { Language } from "@/app/utils/enums";

interface ListboxProps {
  data: Experience;
  setData: React.Dispatch<React.SetStateAction<Experience>>;
}

const LanguagesListbox: React.FC<ListboxProps> = ({ data, setData }) => {
  const options = new Map<Language, string>();
  Object.values(Language).forEach((language) => {
    options.set(language, language);
  });

  const selectedValues = Array.from(data.language)
    .map((key) => key.toString())
    .join(", ");

  return (
    <>
      <div className="pr-0 md:pr-10">
        <div className="w-full rounded-small border-small border-default-200 px-1 py-2 dark:border-default-100">
          <Listbox
            className="h-36 overflow-auto rounded-small px-1 py-2 "
            aria-label="Multiple selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="multiple"
            selectedKeys={data.language}
            onSelectionChange={(keys) => {
              setData((prevData) => ({
                ...prevData,
                language: Array.from(keys) as Language[]
              }));
            }}
          >
            {Array.from(options).map(([key, value]) => (
              <ListboxItem key={key}>{value}</ListboxItem>
            ))}
          </Listbox>
        </div>
        <p className="mt-1 text-sm font-bold">Selected:</p>
        <p className="mb-10 text-xs text-default-500">{selectedValues}</p>
      </div>
    </>
  );
};

export default LanguagesListbox;

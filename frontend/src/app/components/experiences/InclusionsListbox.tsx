import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Inclusion } from "@/app/utils/enums";

// interface ListboxProps {
//   data?: Accommodation;
//   setData: React.Dispatch<React.SetStateAction<Accommodation>>;
// }

const InclusionsListbox: React.FC = () => {
  const options = new Map<Inclusion, string>();
  Object.values(Inclusion).forEach((inclusion) => {
    options.set(inclusion, inclusion);
  });

  const [selectedKeys, setSelectedKeys] = React.useState<any>(
    new Set(["Food"])
  );
  const selectedValues = [...selectedKeys]
    .map((key: Inclusion) => key.toString())
    .join(", ");

  return (
    <>
      <div className="pr-0 md:pr-10">
        <div className="mt-5 w-full rounded-small border-small border-default-200 px-1 py-2 dark:border-default-100">
          <Listbox
            className="h-34 overflow-auto rounded-small px-1 py-2 "
            aria-label="Multiple selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            {Array.from(options).map(([key, value]) => (
              <ListboxItem key={key}>{value}</ListboxItem>
            ))}
          </Listbox>
        </div>
        <p className="mt-10 text-sm font-bold">Your inclusions:</p>
        <p className="mb-10 text-xs text-default-500">{selectedValues}</p>
      </div>
    </>
  );
};

export default InclusionsListbox;

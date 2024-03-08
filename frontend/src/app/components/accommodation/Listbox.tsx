import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";

const ListboxComponent: React.FC = () => {
    const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(
        new Set(["kitchen"])
    );

    const options = new Map();
    options.set("kitchen", "Kitchen");
    options.set("wifi", "Wifi");
    options.set("tv", "TV");
    options.set("cable", "Cable");
    options.set("crib", "Crib");
    options.set("indoor fireplace", "Indoor Fireplace");
    options.set("air conditioning", "Air Conditioning");
    options.set("fan", "Fan");
    options.set("shower", "Shower");
    options.set("heater", "Heater");
    options.set("bathtub", "Bathtub");
    options.set("iron", "Iron");
    options.set("washer", "Washer");
    options.set("dryer", "Dryer");
    options.set("parking", "Parking");
    options.set("gym", "Gym");
    options.set("backyard", "Backyard");
    options.set("beach access", "Beach Access");
    options.set("balcony", "Balcony");
    options.set("pool", "Pool");
    options.set("jacuzzi", "Jacuzzi");
    options.set("outdoor fireplace", "Outdoor Fireplace");
    options.set("bbq grill", "BBQ Grill");
    options.set("pets allowed", "Pets Allowed");

    const selectedValues = Array.from(selectedKeys)
        .map((key) => options.get(key))
        .join(", ");

    return (
        <div className="pr-10">
            <div className="w-full rounded-small border-small border-default-200 px-1 py-2 dark:border-default-100">
                <Listbox
                    className="h-72 overflow-auto rounded-small px-1 py-2 "
                    aria-label="Multiple selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="multiple"
                    selectedKeys={selectedKeys}
                    onSelectionChange={(keys) => {
                        setSelectedKeys(keys as Set<string>);
                    }}
                >
                    {Array.from(options).map(([key, value]) => (
                        <ListboxItem key={key}>{value}</ListboxItem>
                    ))}
                </Listbox>
            </div>
            <p className="mt-1 text-sm font-bold">Your Amenities:</p>
            <p className="text-xs text-default-500">{selectedValues}</p>
        </div>
    );
};

export default ListboxComponent;

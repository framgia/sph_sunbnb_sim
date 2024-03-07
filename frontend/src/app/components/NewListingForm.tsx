"use client";
import React from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import UploadIcon from "./svgs/UploadIcon";

import ListboxComponent from "./Listbox";
import AccommodationMoreDetails from "./AccommodationMoreDetails";
import TypeSelect from "./SelectType";

interface NewListingProps {
    onPress: () => void;
}

const NewListingForm: React.FC<NewListingProps> = ({ onPress }) => {
    const handleBrowseClick = (): void => {
        // Implement the functionality to invoke file input click
        document.getElementById("fileInput")?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        // Implement the functionality to handle file change
        console.log(e.target.files);
    };

    return (
        <section className="flex max-w-[826px] flex-col px-5">
            <header className="w-full text-left text-lg font-semibold leading-7 text-black max-md:max-w-full">
                List Accommodation
            </header>
            <TypeSelect />
            <div className="mt-10 w-full text-left text-sm font-semibold leading-7 text-black max-md:max-w-full">
                Address
            </div>

            <Input
                type="text"
                className="mt-8"
                placeholder="Province"
                variant="bordered"
            />
            <div className="mt-5 flex w-full justify-between gap-5 whitespace-nowrap text-base leading-6 text-zinc-500 max-md:max-w-full max-md:flex-wrap">
                <Input
                    type="text"
                    className="mt-8"
                    placeholder="Street"
                    variant="bordered"
                />
                <Input
                    type="text"
                    className="mt-8"
                    placeholder="Barangay"
                    variant="bordered"
                />
            </div>
            <div className="mt-5 flex w-full justify-between gap-5 whitespace-nowrap text-base leading-6 text-zinc-500 max-md:max-w-full max-md:flex-wrap">
                <Input
                    type="text"
                    className="mt-8"
                    placeholder="City"
                    variant="bordered"
                />
                <Input
                    type="text"
                    className="mt-8"
                    placeholder="Zip Code"
                    variant="bordered"
                />
            </div>
            <div className="mt-12 min-h-[3px] w-full bg-zinc-200 max-md:mt-10 max-md:max-w-full"></div>
            <div className="mt-10 w-full text-left text-lg font-semibold leading-7 text-black max-md:max-w-full">
                Tell us about your place
            </div>
            <Input
                type="text"
                className="mt-8"
                placeholder="Title"
                variant="bordered"
            />
            <Textarea
                label="Description"
                className="mt-8 "
                variant="bordered"
            />

            <div className="mb-10 mt-5 rounded-lg border-[1.3px] border-solid border-[color:var(--Blues-Gray2,#B8BBC2)] p-10">
                <div className="grid grid-cols-2">
                    <div>
                        <div className="mb-5 w-full text-left text-left text-sm font-semibold leading-5 text-black max-md:max-w-full">
                            Amenities
                        </div>
                        <ListboxComponent />
                    </div>
                    <div>
                        <div className="w-full text-left text-sm font-semibold leading-5 text-black max-md:max-w-full">
                            More Details
                        </div>
                        <div>
                            <AccommodationMoreDetails />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 min-h-[3px] w-full bg-zinc-200 max-md:mt-10 max-md:max-w-full"></div>
            <div className="mb-10 mt-10 w-full text-left text-lg font-semibold leading-5 text-black max-md:max-w-full">
                Upload photos of your place
            </div>

            {/* Upload photos section should be implemented here */}

            <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-[#71717A] bg-[#FFF3EC] px-72 py-40 text-3xl text-[#000] max-md:px-5">
                <div className="aspect-square w-[53px]">
                    <UploadIcon />
                </div>
                <h2 className="mt-5 text-center">Drag your photos here</h2>
                <p className="mt-4">or</p>
                <button
                    onClick={handleBrowseClick}
                    className="mt-4 inline-block cursor-pointer rounded-xl bg-primary-600 px-10 py-4 text-xl leading-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50  "
                >
                    Browse
                </button>
                <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                />
            </div>

            <div className="mw-full mt-10 text-left text-sm font-semibold leading-5 text-black max-md:max-w-full ">
                Set your price
            </div>
            <Input
                type="text"
                inputMode="numeric"
                className="mt-8"
                placeholder="₱"
                variant="bordered"
            />
            <div className="mt-9 flex gap-5 self-end whitespace-nowrap text-sm leading-5">
                <Button className="grow justify-center rounded-lg bg-zinc-200 px-7 py-2.5 text-black max-md:px-5">
                    Cancel
                </Button>
                <Button
                    className="grow justify-center rounded-lg bg-primary-600 px-7 py-2.5 font-bold text-white drop-shadow-sm max-md:px-5 "
                    onPress={onPress}
                >
                    Publish
                </Button>
            </div>
        </section>
    );
};
export default NewListingForm;

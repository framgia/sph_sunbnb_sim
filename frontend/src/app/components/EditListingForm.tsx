"use client";
import React from "react";
import { Input, Button, Textarea } from "@nextui-org/react";

import ListboxComponent from "./Listbox";
import AccommodationMoreDetails from "./AccommodationMoreDetails";
import EditSelectType from "./EditSelectType";
import TrashIcon from "./svgs/TrashIcon";

interface EditListingProps {
  onPress: () => void;
}

const EditListingForm: React.FC<EditListingProps> = ({ onPress }) => {
  const handleBrowseClick = (): void => {
    // Implement the functionality to invoke file input click
    document.getElementById("fileInput")?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // Implement the functionality to handle file change
    console.log(e.target.files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    // Your handleDrop logic here
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>): void => {
    // Your handleDragStart logic here
  };

  return (
    <section className="flex max-w-full flex-col px-5">
      <header className="w-full text-left text-lg font-semibold leading-7 text-black max-md:max-w-full">
        List Accommodation
      </header>
      <EditSelectType />
      <div className="mt-10 w-full text-left text-sm font-semibold leading-7 text-black max-md:max-w-full">
        Address
      </div>

      <Input
        type="text"
        className="mt-8"
        label="Province"
        color="success"
        variant="bordered"
      />
      <div className="mt-5 flex w-full justify-between gap-5 whitespace-nowrap text-base leading-6 text-zinc-500 max-md:max-w-full max-md:flex-wrap">
        <Input
          type="text"
          className="mt-8"
          label="Street"
          color="success"
          variant="bordered"
        />
        <Input
          type="text"
          className="mt-8"
          label="Barangay"
          color="success"
          variant="bordered"
        />
      </div>
      <div className="mt-5 flex w-full justify-between gap-5 whitespace-nowrap text-base leading-6 text-zinc-500 max-md:max-w-full max-md:flex-wrap">
        <Input
          type="text"
          className="mt-8"
          label="City"
          color="success"
          variant="bordered"
        />
        <Input
          type="text"
          className="mt-8"
          label="Zip Code"
          color="success"
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
        label="Title"
        color="success"
        variant="bordered"
      />
      <Textarea
        label="Description"
        className="mt-8 "
        variant="bordered"
        color="success"
      />

      <div className="mb-10 mt-5 rounded-lg border-[1.3px] border-solid border-[color:var(--Blues-Gray2,#B8BBC2)] p-10">
        <div className="grid md:grid-cols-2">
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

      <div
        className="flex flex-col items-center rounded-2xl border-2 border-dashed border-[#71717A] bg-[#FFF3EC] px-72 py-40 text-3xl text-[#000] max-md:px-5"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={handleDrop}
      >
        <div
          className="aspect-square w-[53px]"
          draggable
          onDragStart={handleDragStart}
        >
          {/* Add UploadIcon component here */}
        </div>
        <h2 className="mt-5 text-center">Drag your photos here</h2>
        <p className="mt-4">or</p>
        <button
          onClick={handleBrowseClick}
          className="mt-4 inline-block cursor-pointer rounded-xl bg-primary-600 px-10 py-4 text-xl leading-4 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
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

      <div className="rounded-lg">
        <div className="mt-9  flex gap-5 self-end whitespace-nowrap text-sm leading-5">
          <Button
            className=" gap-y-1.5 rounded-lg bg-danger px-4 text-white max-md:px-5"
            size="md"
            onPress={onPress}
          >
            <TrashIcon />
            Delete
          </Button>
          <div className="flex-grow"></div>{" "}
          <Button
            className="justify-center rounded-lg bg-zinc-200 px-7 py-2.5 text-black max-md:px-5"
            size="md"
          >
            Cancel
          </Button>
          <Button
            className="justify-center rounded-lg bg-primary-600 px-7 py-2.5 font-bold text-white drop-shadow-sm max-md:px-5 "
            size="md"
            onPress={onPress}
          >
            Save
          </Button>
        </div>
      </div>
    </section>
  );
};
export default EditListingForm;

import React from "react";

function NewListingForm() {

    const handleBrowseClick = () => {
            // Implement the functionality to invoke file input click
            document.getElementById('fileInput')?.click();
        };
    
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // Implement the functionality to handle file change
            console.log(e.target.files);
        };

        const amenities = [
            { name: "Beach Access", src: "https://example.com/beach-access.jpg" },
            { name: "Pool", src: "https://example.com/pool.jpg" },
            { name: "Gym", src: "https://example.com/gym.jpg" },
            { name: "Parking", src: "https://example.com/parking.jpg" },
            { name: "TV", src: "https://example.com/tv.jpg" },
            { name: "Kitchen", src: "https://example.com/kitchen.jpg" },
            { name: "Pets Allowed", src: "https://example.com/pets-allowed.jpg" }
        ];

  const details = [
    {
      title: "Guests",
      srcPlus: "https://example.com/plus.jpg",
      srcMinus: "https://example.com/minus.jpg"
    },
    {
      title: "Bedroom",
      srcPlus: "https://example.com/plus.jpg",
      srcMinus: "https://example.comminus.jpg"
    },
    {   
      title: "Beds",
      srcPlus: "https://example.com/plus.jpg",
      srcMinus: "https://example.com/minus.jpg"
    },
    {
      title: "Bathrooms",
      srcPlus: "https://example.com/plus.jpg",
      srcMinus: "https://example.com/minus.jpg"
    }
  ];

return (
    <section className="flex flex-col px-5 max-w-[826px]">
        <header className="w-full text-lg font-semibold leading-7 text-left text-black max-md:max-w-full">
            List Accommodation
        </header>
        <div className="mt-10 w-full text-sm font-semibold leading-5 text-center text-black max-md:max-w-full">
            Type
        </div>
        <select
            className="justify-center items-start py-5 pr-16 pl-3.5 mt-8 w-full text-base leading-6 whitespace-nowrap rounded-2xl border-2 border-solid shadow-sm bg-white bg-opacity-0 border-[color:var(--Semantic-light-layout-content3,#E4E4E7)] text-zinc-500 max-md:pr-5 max-md:max-w-full"
        >
            <option value="">Select accommodation type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="cottage">Cottage</option>
        </select>
        <div className="mt-10 w-full text-sm font-semibold leading-5 text-center text-black max-md:max-w-full">
            Address
        </div>
        <input
            type="text"
            className="justify-center items-start py-5 pr-16 pl-3.5 rounded-2xl border-2 border-solid shadow-sm bg-white bg-opacity-0 border-[color:var(--Semantic-light-layout-content3,#E4E4E7)] max-md:pr-5"
            placeholder="Province"
        />
        <div className="flex gap-5 justify-between mt-5 w-full text-base leading-6 whitespace-nowrap text-zinc-500 max-md:flex-wrap max-md:max-w-full">
            <input
                type="text"
                className="justify-center items-start py-5 pr-16 pl-3.5 rounded-2xl border-2 border-solid shadow-sm bg-white bg-opacity-0 border-[color:var(--Semantic-light-layout-content3,#E4E4E7)] max-md:pr-5"
                placeholder="Street"
            />
            <input
                type="text"
                className="justify-center items-start py-5 pr-16 pl-3.5 rounded-2xl border-2 border-solid shadow-sm bg-white bg-opacity-0 border-[color:var(--Semantic-light-layout-content3,#E4E4E7)] max-md:pr-5"
                placeholder="Barangay"
            />
        </div>
        <div className="flex gap-5 justify-between mt-5 w-full text-base leading-6 whitespace-nowrap text-zinc-500 max-md:flex-wrap max-md:max-w-full">
            <input
                type="text"
                className="justify-center items-start py-5 pr-16 pl-3.5 rounded-2xl border-2 border-solid shadow-sm bg-white bg-opacity-0 border-[color:var(--Semantic-light-layout-content3,#E4E4E7)] max-md:pr-5"
                placeholder="City"
            />
            <input
                type="text"
                className="justify-center items-start py-5 pr-16 pl-3.5 rounded-2xl border-2 border-solid shadow-sm bg-white bg-opacity-0 border-[color:var(--Semantic-light-layout-content3,#E4E4E7)] max-md:pr-5"
                placeholder="Zip Code"
            />
        </div>
        <div className="mt-12 w-full bg-zinc-200 min-h-[3px] max-md:mt-10 max-md:max-w-full"></div>
        <div className="mt-10 w-full text-sm font-semibold leading-5 text-center text-black max-md:max-w-full">
            Tell us about your place
        </div>
        <input
            type="text"
            className="justify-center items-start py-5 pr-16 pl-3.5 mt-8 w-full text-base leading-6 whitespace-nowrap rounded-2xl border-2 border-solid shadow-sm bg-white bg-opacity-0 border-[color:var(--Semantic-light-layout-content3,#E4E4E7)] text-zinc-500 max-md:pr-5 max-md:max-w-full"
            placeholder="Title"
        />
        <input
            type="text"
            className="justify-center items-start py-5 pr-16 pl-3.5 mt-8 w-full text-base leading-6 whitespace-nowrap rounded-2xl border-2 border-solid shadow-sm bg-white bg-opacity-0 border-[color:var(--Semantic-light-layout-content3,#E4E4E7)] text-zinc-500 max-md:pr-5 max-md:max-w-full"
            placeholder="Description"
        />
        <div className="mt-10 w-full text-sm font-semibold leading-5 text-center text-black max-md:max-w-full">
            Amenities
        </div>
        <div>
            {amenities.map((amenity, index) => (
                <div key={index} className="flex justify-between px-5 py-3 mt-2 w-full text-base tracking-wide leading-5 bg-white rounded-lg border-solid border-[1.3px] border-[color:var(--Blues-Gray2,#B8BBC2)] text-zinc-500">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>{amenity.name}</span>
                    </label>
                </div>
            ))}
        </div>
        <div className="mt-10 w-full text-sm font-semibold leading-5 text-center text-black max-md:max-w-full">
            More Details
        </div>
        <div>
            {details.map((detail, index) => (
                <div key={index} className="flex justify-between px-5 py-3 mt-2 w-full text-base tracking-wide leading-5 bg-white rounded-lg border-solid border-[1.3px] border-[color:var(--Blues-Gray2,#B8BBC2)] text-zinc-500">
                    <div className="flex-auto">{detail.title}</div>
                    {/* Wa ko kahibao unsaon pag add ug counter :( */}
                </div>
            ))}
        </div>
        <div className="mt-12 w-full bg-zinc-200 min-h-[3px] max-md:mt-10 max-md:max-w-full"></div>
        <div className="mt-10 w-full text-sm font-semibold leading-5 text-center text-black max-md:max-w-full">
            Upload photos of your place
        </div>
        {/* Upload photos section should be implemented here */}

        <div className="px-72 py-40 text-3xl rounded-2xl border-dashed bg-[#FFF3EC] border-2 border-[#71717A] text-[#000] max-md:px-5 flex flex-col items-center">
      <img
        loading="lazy"
        src="/images/document-upload.svg"
        alt="Upload Placeholder"
        className="aspect-square w-[53px]"
      />
      <h2 className="mt-5 text-center">Drag your photos here</h2>
      <p className="mt-4">or</p>
      <button
        onClick={handleBrowseClick}
        className="inline-block px-7 py-1.5 mt-4 text-xs leading-4 text-white bg-red-600 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
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

        <div className="mt-10 w-full text-sm font-semibold leading-5 text-center text-black max-md:max-w-full">
            Set your price
        </div>
        <input
            type="text"
            inputMode="numeric"
            className="justify-center items-start py-5 pr-16 pl-3.5 mt-8 w-full text-base leading-6 whitespace-nowrap rounded-2xl border-2 border-solid shadow-sm bg-white bg-opacity-0 border-[color:var(--Semantic-light-layout-content3,#E4E4E7)] text-zinc-500 max-md:pr-5 max-md:max-w-full"
            placeholder="₱"
        />
        <div className="flex gap-5 self-end mt-9 text-sm leading-5 whitespace-nowrap">
            <button className="grow justify-center px-7 py-2.5 text-black rounded-lg bg-zinc-100 max-md:px-5">
                Cancel
            </button>
            <button className="grow justify-center px-7 py-2.5 font-bold text-white bg-red-600 rounded-lg max-md:px-5">
                Publish
            </button>
        </div>
    </section>
);
}

export default NewListingForm;


{/* kuwang pani */}
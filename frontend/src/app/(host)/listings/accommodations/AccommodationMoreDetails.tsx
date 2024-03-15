import React from "react";
import Counter from "../../../components/accommodation/Counter";
import type { Accommodation } from "@/app/interfaces/AccomodationData";

interface AccommodationMoreDetailsProps {
  data: Accommodation;
  setData: React.Dispatch<React.SetStateAction<Accommodation>>;
}

const AccommodationMoreDetails: React.FC<AccommodationMoreDetailsProps> = ({
  data,
  setData
}) => {
  return (
    <>
      <div>
        <Counter
          name={"Maximum Guests"}
          data={data}
          setData={setData}
          id={"maximum_guests"}
        />
        <hr className="w-full border-1 bg-zinc-200" />
        <Counter
          name={"Bedrooms"}
          data={data}
          setData={setData}
          id="bedroom_count"
        />
        <hr className="w-full border-1 bg-zinc-200" />
        <Counter name={"Beds"} data={data} setData={setData} id="bed_count" />
        <hr className="w-full border-1 bg-zinc-200" />
        <Counter
          name={"Bathrooms"}
          data={data}
          setData={setData}
          id="bathroom_count"
        />
        <hr className="w-full border-1 bg-zinc-200" />
        <Counter
          name={"Minimum Nights"}
          data={data}
          setData={setData}
          id="minimum_days"
        />
        <hr className="w-full border-1 bg-zinc-200" />
        <Counter
          name={"Maximum Nights"}
          data={data}
          setData={setData}
          id="maximum_days"
        />
      </div>
    </>
  );
};

export default AccommodationMoreDetails;

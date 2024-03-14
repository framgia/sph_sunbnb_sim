import React from "react";
import Counter from "./Counter";
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
          name={"Guests"}
          data={data}
          setData={setData}
          id={"maximum_guests"}
        />
        <Counter
          name={"Bedrooms"}
          data={data}
          setData={setData}
          id="bedroom_count"
        />
        <Counter name={"Beds"} data={data} setData={setData} id="bed_count" />
        <Counter
          name={"Bathrooms"}
          data={data}
          setData={setData}
          id="bathroom_count"
        />
        <Counter
          name={"Minimum Nights"}
          data={data}
          setData={setData}
          id="minimum_days"
        />
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

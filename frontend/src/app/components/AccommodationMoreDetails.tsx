import React, { useState } from "react";
import Counter from "./Counter";

interface Detail {
    id: string;
    name: string;
    count: number;
}

const AccommodationMoreDetails: React.FC = () => {
    const [details, setDetails] = useState<Record<string, Detail>>({
        guest: { id: "guest", name: "Guests", count: 0 },
        bedroom: { id: "bedroom", name: "Bedrooms", count: 0 },
        bed: { id: "bed", name: "Beds", count: 0 },
        bathroom: { id: "bathroom", name: "Bathrooms", count: 0 },
        minnights: { id: "minnights", name: "Minimum Nights", count: 0 },
        maxnights: { id: "maxnights", name: "Maximum Nights", count: 0 }
    });

    return (
        <div>
            {Object.values(details).map((detail) => (
                <Counter
                    key={detail.id}
                    detail={detail}
                    setDetails={setDetails}
                    details={details}
                />
            ))}
        </div>
    );
};

export default AccommodationMoreDetails;

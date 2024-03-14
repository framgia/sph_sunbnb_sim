import { type Amenity } from "../utils/enums";

interface Accommodation {
  name: string;
  description: string;
  province: string;
  city: string;
  barangay: string;
  street: string;
  zip_code: number;
  price: number;
  maximum_guests: number;
  type: string;
  bed_count: number;
  bedroom_count: number;
  bathroom_count: number;
  minimum_days: number;
  maximum_days: number;
  amenities: Amenity[];
}

// Media
// media: {
//   delete: string[];
//   new: string[];
// };
// media: string[];

export type { Accommodation };

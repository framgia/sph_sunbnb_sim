import { Inclusion } from "../utils/enums";

interface Experience {
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
  minimum_days: number;
  maximum_days: number;
  inclusions: Inclusion[];
}

interface MediaUpdate {
  prev: Array<{
    id: number;
    url: string;
  }>;
  delete: number[];
  new: string[];
}

export type { Experience, MediaUpdate };

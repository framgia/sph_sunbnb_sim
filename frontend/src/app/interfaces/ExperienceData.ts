import type { Inclusion, Language } from "../utils/enums";

interface ExperienceData {
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
  start_time: string;
  end_time: string;
  inclusions: Inclusion[];
  language: Language[];
}

interface MediaUpdate {
  prev: Array<{
    id: number;
    url: string;
  }>;
  delete: number[];
  new: string[];
}

export type { ExperienceData, MediaUpdate };

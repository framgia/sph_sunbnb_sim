"use server";
import config from "@/app/config/config";
import type {
  Accommodation,
  MediaUpdate
} from "@/app/interfaces/AccomodationData";
import { type Listing } from "@/app/interfaces/types";
import { cookies } from "next/headers";

export async function validateAccommodation(
  data: Accommodation,
  media: string[] | MediaUpdate,
  isUpdate = false
): Promise<Record<string, string | boolean>> {
  for (const [, value] of Object.entries(data)) {
    if (typeof value === "string" && value.trim() === "") {
      return {
        hasError: true,
        message: "All fields must be completed."
      };
    }
    if (typeof value === "number" && (isNaN(value) || value <= 0)) {
      return {
        hasError: true,
        message: "All fields containing numbers must be greater than 0."
      };
    }
  }

  if (
    data.minimum_days != null &&
    data.maximum_days != null &&
    data.minimum_days > data.maximum_days
  ) {
    return {
      hasError: true,
      message: "Maximum days cannot be lower than minimum days."
    };
  }

  if (data.amenities.length === 0) {
    return {
      hasError: true,
      message: "At least one amenity must be provided."
    };
  }
  if (!isUpdate && Array.isArray(media) && media.length === 0) {
    return {
      hasError: true,
      message: "At least one photo must be provided."
    };
  }

  if (isUpdate && typeof media === "object" && media !== null) {
    const mediaUpdate = media as MediaUpdate;
    if (mediaUpdate.prev.length === 0 && mediaUpdate.new.length === 0) {
      return {
        hasError: true,
        message: "At least one photo must be provided."
      };
    }
  }

  return { hasError: false, message: "Validation successful." };
}

function setHeaders(): Record<string, string> {
  const jwt = cookies().get("jwt")?.value;
  if (jwt === undefined) throw new Error("No JWT found in cookies.");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${jwt}`
  };
}

export async function createAccommodation(
  data: Accommodation,
  media: string[]
): Promise<Record<string, string | boolean>> {
  try {
    const accommodationWithMedia = { ...data, media };
    const response = await fetch(`${config.backendUrl}/accommodation`, {
      method: "POST",
      headers: setHeaders(),
      body: JSON.stringify(accommodationWithMedia)
    });

    const responseData = await response.json();
    if (response.ok) {
      return {
        hasError: false,
        message: "Listing created successfully."
      };
    } else if (responseData.error !== undefined) {
      throw new Error(responseData.error as string);
    } else {
      return {
        hasError: true,
        message: "Unknown error occurred. Please contact the administrator."
      };
    }
  } catch (error) {
    return {
      hasError: true,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please contact the administrator."
    };
  }
}

export async function getAccommodation(id: number): Promise<Listing> {
  const response = await fetch(`${config.backendUrl}/accommodation/${id}`, {
    method: "GET",
    headers: setHeaders()
  });

  const responseData = await response.json();
  if (response.ok) {
    return responseData.listing;
  } else throw new Error(responseData.error as string);
}

export async function updateAccommodation(
  id: number,
  data: Accommodation,
  media: MediaUpdate
): Promise<Record<string, string | boolean>> {
  try {
    const { prev, ...mediaWithoutPrev } = media;
    const accommodationWithMedia = { ...data, media: { ...mediaWithoutPrev } };
    const response = await fetch(`${config.backendUrl}/accommodation/${id}`, {
      method: "PUT",
      headers: setHeaders(),
      body: JSON.stringify(accommodationWithMedia)
    });

    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
      return {
        hasError: false,
        message: "Listing updated successfully."
      };
    } else if (responseData.error !== undefined) {
      throw new Error(responseData.error as string);
    } else {
      return {
        hasError: true,
        message: "Unknown error occurred. Please contact the administrator."
      };
    }
  } catch (error) {
    return {
      hasError: true,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please contact the administrator."
    };
  }
}

export async function handleDelete(id: number): Promise<{ message: string }> {
  const jwt = cookies().get("jwt")?.value;
  if (jwt !== undefined) {
    console.log(jwt);
    const fetchApi = await fetch(`${config.backendUrl}/accommodation/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const resData = await fetchApi.json();
    console.log(resData);
    return {
      message: resData.message
    };
  } else {
    return {
      message: "Nothing to delete"
    };
  }
}

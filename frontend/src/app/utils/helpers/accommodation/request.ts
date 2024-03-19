"use server";
import config from "@/app/config/config";
import type {
  Accommodation,
  MediaUpdate
} from "@/app/interfaces/AccomodationData";
import { type PaginatedListing, type Listing } from "@/app/interfaces/types";
import { cookies } from "next/headers";
import { checkCookies } from "../userHelper";

function setHeaders(): Record<string, string> {
  const jwt = cookies().get("jwt")?.value;
  if (jwt === undefined) throw new Error("No JWT found in cookies.");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${jwt}`
  };
}

async function createAccommodation(
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

async function getAccommodation(id: number): Promise<Listing> {
  const response = await fetch(`${config.backendUrl}/accommodation/${id}`, {
    method: "GET",
    headers: setHeaders()
  });

  const responseData = await response.json();
  if (response.ok) {
    return responseData.listing;
  } else throw new Error(responseData.error as string);
}

async function updateAccommodation(
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

async function deleteAccommodation(id: number): Promise<{ message: string }> {
  const jwt = cookies().get("jwt")?.value;
  if (jwt !== undefined) {
    const fetchApi = await fetch(`${config.backendUrl}/accommodation/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const resData = await fetchApi.json();
    return {
      message: resData.message
    };
  } else {
    return {
      message: "Nothing to delete"
    };
  }
}

async function getAccommodationsByUser(
  page: number,
  limit: number
): Promise<PaginatedListing | undefined> {
  try {
    const jwt = cookies().get("jwt")?.value;
    if (jwt === undefined) throw new Error("No JWT found in cookies.");

    const user = await checkCookies();
    if (user === null) throw new Error("No user found in cookies.");

    const response = await fetch(
      `${config.backendUrl}/accommodation/user/${user.id}?page=${page}&per_page=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    if (!response.ok) throw new Error("Failed to fetch accommodations.");

    const data = await response.json();

    return {
      listings: data.listings,
      pagination: data.pagination
    };
  } catch (error) {
    console.error("Failed to fetch accommodations.", error);
  }
}

export {
  createAccommodation,
  getAccommodation,
  updateAccommodation,
  deleteAccommodation,
  getAccommodationsByUser
};

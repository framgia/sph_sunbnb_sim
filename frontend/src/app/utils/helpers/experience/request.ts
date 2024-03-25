"use server";
import config from "@/app/config/config";
import type { MediaUpdate } from "@/app/interfaces/AccomodationData";
import type {
  PaginatedListing,
  ExperienceListing
} from "@/app/interfaces/types";
import { cookies } from "next/headers";
import { checkCookies } from "../userHelper";
import type { ExperienceData } from "@/app/interfaces/ExperienceData";

function setHeaders(): Record<string, string> {
  const jwt = cookies().get("jwt")?.value;
  if (jwt === undefined) throw new Error("No JWT found in cookies.");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${jwt}`
  };
}

async function createExperience(
  data: ExperienceData,
  media: string[]
): Promise<Record<string, string | boolean>> {
  try {
    const experiencewithMedia = { ...data, media };
    const response = await fetch(`${config.backendUrl}/experience`, {
      method: "POST",
      headers: setHeaders(),
      body: JSON.stringify(experiencewithMedia)
    });

    const responseData = await response.json();
    if (response.ok) {
      return {
        hasError: false,
        message: "Listing created successfully.",
        id: responseData.data.id
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

async function getExperience(id: number): Promise<ExperienceListing> {
  const response = await fetch(`${config.backendUrl}/listing/${id}`, {
    method: "GET",
    headers: setHeaders()
  });

  const responseData = await response.json();
  if (response.ok) {
    return responseData.listing;
  } else throw new Error(responseData.error as string);
}

async function updateExperience(
  id: number,
  data: ExperienceData,
  media: MediaUpdate
): Promise<Record<string, string | boolean>> {
  try {
    const { prev, ...mediaWithoutPrev } = media;
    const accommodationWithMedia = { ...data, media: { ...mediaWithoutPrev } };
    const response = await fetch(`${config.backendUrl}/experience/${id}`, {
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

async function deleteExperience(
  id: number
): Promise<Record<string, string | boolean>> {
  const jwt = cookies().get("jwt")?.value;
  if (jwt !== undefined) {
    try {
      const response = await fetch(`${config.backendUrl}/listing/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      const responseData = await response.json();
      if (response.ok) {
        return {
          hasError: false,
          message: responseData.message
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
  } else {
    return {
      hasError: true,
      message: "Nothing to delete"
    };
  }
}

async function getExperienceByUser(
  page: number,
  limit: number
): Promise<PaginatedListing | undefined> {
  try {
    const jwt = cookies().get("jwt")?.value;
    if (jwt === undefined) throw new Error("No JWT found in cookies.");

    const user = await checkCookies();
    if (user === null) throw new Error("No user found in cookies.");

    const response = await fetch(
      `${config.backendUrl}/experience/user/${user.id}?page=${page}&per_page=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    );

    if (!response.ok) throw new Error("Failed to fetch experience.");

    const data = await response.json();

    return {
      listings: data.listings,
      pagination: data.pagination
    };
  } catch (error) {
    console.error("Failed to fetch experience.", error);
  }
}

export {
  createExperience,
  getExperience,
  updateExperience,
  deleteExperience,
  getExperienceByUser
};

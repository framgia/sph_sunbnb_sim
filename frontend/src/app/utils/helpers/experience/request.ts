"use server";

import { Experience } from "@/app/interfaces/ExperienceData";
import config from "@/app/config/config";
import { type Listing_Experience } from "@/app/interfaces/types";
import { cookies } from "next/headers";

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
  data: Experience,
  media: string[]
): Promise<Record<string, string | boolean>> {
  try {
    const experienceWithMedia = { ...data, media };
    console.log(experienceWithMedia);
    const response = await fetch(`${config.backendUrl}/experience`, {
      method: "POST",
      headers: setHeaders(),
      body: JSON.stringify(experienceWithMedia)
    });

    const responseData = await response.json();
    console.log(responseData);
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
    console.log(error);
    return {
      hasError: true,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please contact the administrator."
    };
  }
}

export { createExperience };
async function getExperience(id: number): Promise<Listing_Experience> {
  const response = await fetch(`${config.backendUrl}/listing/${id}`, {
    method: "GET",
    headers: setHeaders()
  });

  const responseData = await response.json();
  if (response.ok) {
    return responseData.listing;
  } else throw new Error(responseData.error as string);
}

export { getExperience };

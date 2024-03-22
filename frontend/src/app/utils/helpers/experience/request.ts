"use server";

import { Experience } from "@/app/interfaces/ExperienceData";
import { cookies } from "next/headers";
import config from "@/app/config/config";

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
    const response = await fetch(`${config.backendUrl}/experience`, {
      method: "POST",
      headers: setHeaders(),
      body: JSON.stringify(experienceWithMedia)
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

export { createExperience };

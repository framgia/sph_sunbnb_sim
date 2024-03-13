import config from "@/app/config/config";
import type { Accommodation } from "@/app/interfaces/AccomodationData";

export async function createAccommodation(
  data: Accommodation,
  media: string[]
): Promise<Record<string, string | boolean>> {
  try {
    const accommodationWithMedia = { ...data, media };
    const response = await fetch(`${config.backendUrl}/accommodation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ""
      },
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

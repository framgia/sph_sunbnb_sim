"use server";
import config from "@/app/config/config";
import type {
  AccommodationReviewData,
  ExperienceReviewData,
  ReviewType
} from "@/app/interfaces/types";
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

async function getReviews(id: number): Promise<ReviewType[]> {
  const response = await fetch(`${config.backendUrl}/review/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Accept: "application/json" }
  });

  const responseData = await response.json();
  if (response.ok) {
    return responseData.listings;
  } else throw new Error(responseData.error as string);
}

async function createAccommodationReview(
  id: number,
  data: AccommodationReviewData
): Promise<Record<string, string | boolean>> {
  try {
    const response = await fetch(
      `${config.backendUrl}/review/accommodation/${id}`,
      {
        method: "POST",
        headers: setHeaders(),
        body: JSON.stringify(data)
      }
    );

    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
      return {
        hasError: false,
        message: "Review added successfully."
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

async function createExperienceReview(
  id: number,
  data: ExperienceReviewData
): Promise<Record<string, string | boolean>> {
  try {
    const response = await fetch(
      `${config.backendUrl}/review/experience/${id}`,
      {
        method: "POST",
        headers: setHeaders(),
        body: JSON.stringify(data)
      }
    );

    const responseData = await response.json();
    if (response.ok) {
      return {
        hasError: false,
        message: "Review added successfully."
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

async function updateBookingReview(id: number): Promise<void> {
  try {
    const response = await fetch(
      `${config.backendUrl}/booking/mark-reviewed/${id}`,
      {
        method: "PUT",
        headers: setHeaders()
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.error as string);
    }
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An unexpected error occurred. Please contact the administrator."
    );
  }
}

export {
  getReviews,
  createAccommodationReview,
  createExperienceReview,
  updateBookingReview
};

"use server";
import config from "@/app/config/config";
import type { BookingData } from "@/app/interfaces/types";
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

async function createBooking(
  data: BookingData
): Promise<Record<string, string | boolean>> {
  try {
    const response = await fetch(`${config.backendUrl}/booking`, {
      method: "POST",
      headers: setHeaders(),
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    if (response.ok) {
      return {
        hasError: false,
        message: "Booking created successfully.",
        bookingId: responseData.id
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

export { createBooking };

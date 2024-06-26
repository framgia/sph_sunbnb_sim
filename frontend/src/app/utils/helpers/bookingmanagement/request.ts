"use server";
import {
  type BookingFilters,
  type Listing,
  type BookingResponse
} from "@/app/interfaces/types";
import { cookies } from "next/headers";
import config from "@/app/config/config";
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

async function getPendingListings(): Promise<Listing[]> {
  const user = await checkCookies();
  if (user === null) throw new Error("No user found in cookies.");
  const response = await fetch(
    `${config.backendUrl}/listing/user/${user.id}?per_page=1000&status=pending`,
    {
      method: "GET",
      headers: setHeaders()
    }
  );
  const responseData = await response.json();
  if (response.ok) {
    return responseData.listings;
  } else throw new Error(responseData.error as string);
}

async function getActiveListings(): Promise<Listing[]> {
  const user = await checkCookies();
  if (user === null) throw new Error("No user found in cookies.");
  const response = await fetch(
    `${config.backendUrl}/listing/user/${user.id}?per_page=1000&status=active`,
    {
      method: "GET",
      headers: setHeaders()
    }
  );
  const responseData = await response.json();
  if (response.ok) {
    return responseData.listings;
  } else throw new Error(responseData.error as string);
}

async function getListingBookings(
  listingId: number,
  filters: BookingFilters,
  page: number
): Promise<BookingResponse> {
  const queryParams = new URLSearchParams();
  if (filters.status !== "status") {
    queryParams.append("status", filters.status);
  }
  if (filters.search !== "") {
    queryParams.append("search", filters.search);
  }
  if (filters.per_page !== "") {
    queryParams.append("per_page", filters.per_page);
  }
  if (filters.sort !== "") {
    queryParams.append("sort", filters.sort);
  }
  queryParams.append("page", page.toString());
  const response = await fetch(
    `${config.backendUrl}/booking/listing/${listingId}${queryParams.toString() !== "" ? `?${queryParams.toString()}` : ""}`,
    {
      method: "GET",
      headers: setHeaders()
    }
  );
  const responseData = await response.json();
  if (response.ok) {
    return responseData;
  } else {
    throw new Error(responseData.error as string);
  }
}

async function bookingAction(
  id: number,
  action: string
): Promise<Record<string, string | boolean>> {
  try {
    const response = await fetch(
      `${config.backendUrl}/booking/approve-refuse/${id}`,
      {
        method: "PUT",
        headers: setHeaders(),
        body: JSON.stringify({ action })
      }
    );

    const responseData = await response.json();
    if (response.ok) {
      return {
        hasError: false,
        message: "Booking updated successfully."
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

async function cancelBooking(
  id: number
): Promise<Record<string, string | boolean>> {
  try {
    const response = await fetch(`${config.backendUrl}/booking/delete/${id}`, {
      method: "PUT",
      headers: setHeaders()
    });

    const responseData = await response.json();
    if (response.ok) {
      return {
        hasError: false,
        message: "Booking deleted successfully."
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

export {
  getPendingListings,
  getActiveListings,
  getListingBookings,
  bookingAction,
  cancelBooking
};

"use server";

import config from "@/app/config/config";
import type {
  BookingFilters,
  BookingHistory,
  BookingHistoryResponse
} from "@/app/interfaces/types";
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

async function getBookingHistory(
  userId: number,
  filters: BookingFilters,
  page: number
): Promise<BookingHistoryResponse> {
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
    `${config.backendUrl}/booking/user/${userId}${queryParams.toString() !== "" ? `?${queryParams.toString()}` : ""}`,
    {
      method: "GET",
      headers: setHeaders()
    }
  );

  const responseData = await response.json();
  if (response.ok) {
    return {
      pagination: responseData.pagination,
      bookings: responseData.bookings
    };
  } else throw new Error(responseData.error as string);
}

async function updateBooking(listingId: number): Promise<BookingHistory[]> {
  const user = await checkCookies();
  if (user === null) throw new Error("No user found in cookies.");
  const response = await fetch(`${config.backendUrl}/booking/${listingId}`, {
    method: "PUT",
    headers: setHeaders()
  });

  const responseData = await response.json();
  if (response.ok) {
    return responseData.bookings;
  } else throw new Error(responseData.error as string);
}

async function deleteBooking(listingId: number): Promise<BookingHistory[]> {
  const response = await fetch(`${config.backendUrl}/booking/${listingId}`, {
    method: "DELETE",
    headers: setHeaders()
  });

  const responseData = await response.json();
  if (response.ok) {
    return responseData.bookings;
  } else throw new Error(responseData.error as string);
}

export { getBookingHistory, updateBooking, deleteBooking };

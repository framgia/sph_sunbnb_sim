"use server";

import config from "@/app/config/config";
import { BookingHistory, BookingHistoryResponse } from "@/app/interfaces/types";
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
  page: number,
  size: number,
  query?: string
): Promise<BookingHistoryResponse> {
  const user = await checkCookies();
  if (user === null) throw new Error("No user found in cookies.");
  const response = await fetch(
    `${config.backendUrl}/booking/user/${user.id}?page=${page ?? 1}&per_page=${size ?? 5}${query !== undefined ? `&search=${query}` : ""}`,
    {
      method: "GET",
      headers: setHeaders()
    }
  );

  const responseData = await response.json();
  console.log(
    "fetched results ",
    responseData.pagination.current_page,
    responseData.bookings.length
  );
  if (response.ok) {
    return {
      pagination: responseData.pagination,
      bookings: responseData.bookings
    };
  } else throw new Error(responseData.error as string);
}

async function updateBooking(listing_id: number): Promise<BookingHistory[]> {
  const user = await checkCookies();
  if (user === null) throw new Error("No user found in cookies.");
  const response = await fetch(`${config.backendUrl}/booking/${listing_id}`, {
    method: "PUT",
    headers: setHeaders()
  });

  const responseData = await response.json();
  if (response.ok) {
    return responseData.bookings;
  } else throw new Error(responseData.error as string);
}

async function deleteBooking(listing_id: number): Promise<BookingHistory[]> {
  const user = await checkCookies();
  if (user === null) throw new Error("No user found in cookies.");
  const response = await fetch(`${config.backendUrl}/booking/${listing_id}`, {
    method: "DELETE",
    headers: setHeaders()
  });

  const responseData = await response.json();
  if (response.ok) {
    return responseData.bookings;
  } else throw new Error(responseData.error as string);
}

export { getBookingHistory, updateBooking, deleteBooking };

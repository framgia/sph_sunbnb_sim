"use server";
import { type BookingType, type Listing } from "@/app/interfaces/types";
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
    // to be changed to active status on the next sprint
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
  status: string
): Promise<BookingType[]> {
  const response = await fetch(
    `${config.backendUrl}/booking/listing/${listingId}${status !== "status" ? `?status=${status}` : ""}`,
    {
      method: "GET",
      headers: setHeaders()
    }
  );
  const responseData = await response.json();
  if (response.ok) {
    return responseData.bookings;
  } else throw new Error(responseData.error as string);
}

export { getPendingListings, getActiveListings, getListingBookings };

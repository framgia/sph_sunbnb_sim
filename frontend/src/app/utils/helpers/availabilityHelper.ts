"use server";
import { type CalendarDate, type Listing } from "@/app/interfaces/types";
import config from "@/app/config/config";
import { checkCookies } from "./userHelper";
import { type AvailabilityListing } from "@/app/interfaces/AvailabilityCalendarProps";
import { cookies } from "next/headers";

class ApiError extends Error {
  constructor(
    public status: number,
    public message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function setHeaders(): Record<string, string> {
  const jwt = cookies().get("jwt")?.value;
  if (jwt === undefined) throw new Error("No JWT found in cookies.");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${jwt}`
  };
}

async function fetchApi(url: string, options = {}): Promise<any> {
  const response = await fetch(url, { ...options, headers: setHeaders() });
  if (!response.ok)
    throw new ApiError(
      response.status,
      `HTTP error! status: ${response.status}`
    );
  return await response.json();
}

export async function getListingNames(): Promise<
  AvailabilityListing[] | undefined
> {
  try {
    const user = await checkCookies();
    if (user === null) throw new Error("No user found in cookies.");
    const { listings: accommodations } = await fetchApi(
      `${config.backendUrl}/accommodation/user/${user.id}?per_page=${1000}`
    );
    return accommodations.map(({ id, name, price }: Listing) => ({
      id,
      name,
      price
    }));
  } catch (error) {
    console.error("Failed to fetch listing names.", error);
  }
}

export async function getListingAvailability(
  id: number
): Promise<CalendarDate[] | undefined> {
  try {
    const { calendar_dates: calendarDates } = (await fetchApi(
      `${config.backendUrl}/calendar/${id}`
    )) as { calendar_dates: CalendarDate[] };
    return calendarDates;
  } catch (error) {
    console.error("Failed to fetch listing availability.", error);
  }
}

export async function updateListingAvailability(
  id: number,
  calendarDates: CalendarDate[]
): Promise<string | undefined> {
  try {
    return await fetchApi(`${config.backendUrl}/calendar/${id}`, {
      method: "PUT",
      body: JSON.stringify({ dates: calendarDates })
    });
  } catch (error) {
    console.error("Failed to update listing availability.", error);
  }
}

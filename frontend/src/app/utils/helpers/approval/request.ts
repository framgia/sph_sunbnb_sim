import config from "@/app/config/config";
import type { Listing, PaginationType } from "@/app/interfaces/types";
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

async function getAllListings(
  page?: number,
  query?: string
): Promise<{ listings: Listing[]; paginate: PaginationType }> {
  const response = await fetch(
    `${config.backendUrl}/listing?per_page=9&page=${page ?? 1}${query !== undefined ? `&search=${query}` : ""}`,
    {
      method: "GET",
      headers: setHeaders()
    }
  );

  const responseData = await response.json();
  if (response.ok) {
    return {
      listings: responseData.listings,
      paginate: responseData.pagination
    };
  } else throw new Error(responseData.error as string);
}

export { getAllListings };

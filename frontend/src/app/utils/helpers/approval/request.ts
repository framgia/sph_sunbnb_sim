"use server";
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
  query?: string,
  listableType?: string,
  status?: string
): Promise<{ listings: Listing[]; paginate: PaginationType }> {
  const listableTypeParam =
    listableType !== undefined && listableType !== null
      ? `&listable_type=${listableType}`
      : "&listable_type=Accommodation";
  const statusParam =
    status !== undefined && status !== null ? `&status=${status}` : "";
  const response = await fetch(
    `${config.backendUrl}/listing?per_page=9&page=${page ?? 1}${query !== undefined ? `&search=${query}` : ""}${listableTypeParam}${statusParam}`,
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

async function reviewAction(
  id: number,
  action: string
): Promise<Record<string, string | boolean>> {
  try {
    const response = await fetch(`${config.backendUrl}/review-listing/${id}`, {
      method: "PUT",
      headers: setHeaders(),
      body: JSON.stringify({ action })
    });

    const responseData = await response.json();
    if (response.ok) {
      return {
        hasError: false,
        message: "Successful transaction."
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

export { getAllListings, reviewAction };

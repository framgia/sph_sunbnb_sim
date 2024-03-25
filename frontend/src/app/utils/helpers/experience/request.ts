"use server";
import config from "@/app/config/config";
import { type Listing_Experience } from "@/app/interfaces/types";
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

async function getExperience(id: number): Promise<Listing_Experience> {
  const response = await fetch(`${config.backendUrl}/listing/${id}`, {
    method: "GET",
    headers: setHeaders()
  });

  const responseData = await response.json();
  if (response.ok) {
    return responseData.listing;
  } else throw new Error(responseData.error as string);
}

export { getExperience };

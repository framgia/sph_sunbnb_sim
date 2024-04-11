"use server";
import config from "@/app/config/config";
import type {
  ReportData,
  ReportFilters,
  ReportResponse
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

async function createReport(
  id: number,
  data: ReportData
): Promise<Record<string, string | boolean>> {
  try {
    const response = await fetch(`${config.backendUrl}/report/${id}`, {
      method: "POST",
      headers: setHeaders(),
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    if (response.ok) {
      return {
        hasError: false,
        message: "Report created successfully."
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

async function getReports(filters: ReportFilters): Promise<ReportResponse> {
  const queryParams = new URLSearchParams();
  queryParams.append("status", filters.status);
  queryParams.append("sort", filters.sort);
  if (filters.reason !== "") {
    queryParams.append("reason", filters.reason);
  }
  if (filters.type !== "") {
    queryParams.append("type", filters.type);
  }
  const response = await fetch(
    `${config.backendUrl}/report${queryParams.toString() !== "" ? `?${queryParams.toString()}` : ""}`,
    {
      method: "GET",
      headers: setHeaders()
    }
  );

  const responseData = await response.json();

  if (response.ok) {
    return responseData;
  } else throw new Error(responseData.error as string);
}

async function closeReport(
  id: number
): Promise<Record<string, string | boolean>> {
  const response = await fetch(`${config.backendUrl}/report/${id}`, {
    method: "PUT",
    headers: setHeaders()
  });

  const responseData = await response.json();
  if (response.ok) {
    return { message: responseData.message, hasError: false };
  } else throw new Error(responseData.error as string);
}

async function deleteReport(
  id: number
): Promise<Record<string, string | boolean>> {
  const response = await fetch(`${config.backendUrl}/report/${id}`, {
    method: "DELETE",
    headers: setHeaders()
  });

  const responseData = await response.json();
  if (response.ok) {
    return { message: responseData.message, hasError: false };
  } else throw new Error(responseData.error as string);
}

export { createReport, getReports, closeReport, deleteReport };

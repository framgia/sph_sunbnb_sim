"use server";
import config from "@/app/config/config";
import {
  Admin,
  Booking,
  Listing,
  PaginationType,
  UserAdminResponse,
  UserDetailsType
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

async function getAllUsers(
  page?: number
): Promise<{ user: UserDetailsType[]; paginate: PaginationType }> {
  const response = await fetch(
    `${config.backendUrl}/all-users?per_page=9&page=${page ?? 1}`,
    {
      method: "GET",
      headers: setHeaders()
    }
  );

  const responseData = await response.json();

  if (response.ok) {
    return {
      user: responseData.data,
      paginate: responseData.pagination
    };
  } else throw new Error(responseData.error as string);
}

async function getAdminById(userId: number): Promise<UserAdminResponse> {
  const response = await fetch(`${config.backendUrl}/admin/${userId}`, {
    method: "GET",
    headers: setHeaders()
  });

  const responseData = await response.json();
  if (response.ok) {
    return responseData.user;
  } else throw new Error(responseData.error as string);
}

async function getUserDetailsAdmin(userId: number): Promise<UserAdminResponse> {
  const response = await fetch(`${config.backendUrl}/admin/user/${userId}`, {
    method: "GET",
    headers: setHeaders()
  });

  const responseData = await response.json();

  if (response.ok) {
    return responseData;
  } else throw new Error(responseData.error as string);
}

async function banUser(userId: number, reason: string): Promise<void> {
  const response = await fetch(`${config.backendUrl}/ban`, {
    method: "POST",
    headers: setHeaders(),
    body: JSON.stringify({ reason, user_id: userId })
  });

  const responseData = await response.json();
  if (!response.ok) throw new Error(responseData.error as string);
}

async function unbanUser(userId: number): Promise<void> {
  const response = await fetch(`${config.backendUrl}/unban`, {
    method: "PUT",
    headers: setHeaders(),
    body: JSON.stringify({ user_id: userId })
  });

  const responseData = await response.json();
  if (!response.ok) throw new Error(responseData.error as string);
}

export { getAllUsers, getAdminById, getUserDetailsAdmin, banUser, unbanUser };

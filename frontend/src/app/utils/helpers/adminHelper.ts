"use server";
import config from "@/app/config/config";
import type {
  JwtPayloadwithUser,
  AdminAnalytics,
  UserDetailsType
} from "@/app/interfaces/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { checkCookies } from "./userHelper";

export async function loginAdmin(
  email: string,
  password: string
): Promise<{ message: string }> {
  const response = await fetch(`${config.backendUrl}/login/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  const resData = await response.json();

  if (resData.token !== undefined && resData.token !== "") {
    const decodedJwt: JwtPayloadwithUser = jwtDecode(resData.token as string);
    if (resData.success as boolean) {
      if (decodedJwt.user.role === null) {
        return { message: "no role" };
      } else {
        cookies().set("jwt", resData.token as string, {
          httpOnly: true,
          expires: new Date(resData.expires_in as string)
        });
        return { message: "success" };
      }
    }
  }
  return { message: "login failed" };
}

export async function getAdminAnalytics(): Promise<AdminAnalytics | undefined> {
  try {
    const jwt = cookies().get("jwt")?.value;
    if (jwt === undefined) throw new Error("No JWT found in cookies.");

    const user = await checkCookies();
    if (user === null) throw new Error("No user found in cookies.");

    const response = await fetch(`${config.backendUrl}/analytics`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });

    if (!response.ok) throw new Error("Failed to fetch admin analytics.");

    const data = await response.json();

    return data.data as AdminAnalytics;
  } catch (error) {
    console.error("Failed to fetch admin analytics.", error);
  }
}

export async function getAdmin(
  id: number,
  jwt: string
): Promise<UserDetailsType | null> {
  const fetchApi = await fetch(`${config.backendUrl}/admin/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const resData = await fetchApi.json();
  if (resData.success as boolean) {
    return resData.user as UserDetailsType;
  }
  return null;
}

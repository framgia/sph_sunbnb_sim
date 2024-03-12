"use server";

import config from "../config/config";
import type { UserRegisterType, UserSessionType } from "../interfaces/types";
import { cookies } from "next/headers";

export async function registerUser(
  user: UserRegisterType
): Promise<{ message: string }> {
  const fetchApi = await fetch(`${config.backendUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(user)
  });
  const resData = await fetchApi.json();
  if (resData.success !== undefined) {
    cookies().set("jwt", resData.token as string, {
      httpOnly: true,
      expires: new Date(resData.expires_in as string)
    });
    cookies().set("user", JSON.stringify(resData.user as string), {
      httpOnly: true,
      expires: new Date(resData.expires_in as string)
    });

    return {
      message: "success"
    };
  } else {
    return {
      message: resData.message
    };
  }
}
export async function logoutUser(): Promise<{ message: string }> {
  const jwt = cookies().get("jwt")?.value;
  if (jwt !== undefined) {
    const fetchApi = await fetch(`${config.backendUrl}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const resData = await fetchApi.json();
    console.log(resData);
    cookies().delete("jwt");
    cookies().delete("user");
    return {
      message: resData.message
    };
  } else {
    return {
      message: "No user to logout"
    };
  }
}

export async function checkCookies(): Promise<UserSessionType | null> {
  const user = cookies().get("user")?.value;

  if (user !== undefined) {
    const jsUser = JSON.parse(user);
    return jsUser as UserSessionType;
  } else {
    return null;
  }
}

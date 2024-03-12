"use server";

import config from "../config/config";
import type { UserRegisterType, UserSessionType } from "../interfaces/types";
import { cookies } from "next/headers";

export async function registerUser(
  user: UserRegisterType
): Promise<{ message: string }> {
  let fetchApi = await fetch(`${config.backendUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(user)
  });
  let resData = await fetchApi.json();
  console.log(resData);
  if (resData.success) {
    cookies().set("jwt", resData.token, {
      httpOnly: true,
      expires: new Date(resData.expires_in)
    });
    cookies().set("user", JSON.stringify(resData.user), {
      httpOnly: true,
      expires: new Date(resData.expires_in)
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

export async function checkCookies(): Promise<UserSessionType | null> {
  const user = cookies().get("user")?.value;

  if (user) {
    const jsUser = JSON.parse(user);
    return jsUser.user as UserSessionType;
  } else {
    return null;
  }
}

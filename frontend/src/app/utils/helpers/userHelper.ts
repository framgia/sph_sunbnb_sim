"use server";

import { jwtDecode } from "jwt-decode";
import config from "../../config/config";
import type { UserRegisterType, UserSessionType } from "../../interfaces/types";
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
    cookies().delete("jwt");
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
  const jwt = cookies().get("jwt")?.value;

  if (jwt !== undefined && jwt !== "") {
    const decodedJwt = jwtDecode(jwt);
    const user = await getUser(Number(decodedJwt.sub), jwt);
    console.log("check result", user);
    if (user !== undefined && user !== null) {
      return user;
    }
  }
  return null;
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ message: string }> {
  const response = await fetch(`${config.backendUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const resData = await response.json();

  if (resData.success) {
    cookies().set("jwt", resData.token as string, {
      httpOnly: true,
      expires: new Date(resData.expires_in as string)
    });
    cookies().set("user", JSON.stringify(resData.user as string), {
      httpOnly: true,
      expires: new Date(resData.expires_in as string)
    });
    return { message: "success" };
  }
  return { message: "login failed" };
}

export async function getUser(
  id: number,
  jwt: string
): Promise<UserSessionType | null> {
  const fetchApi = await fetch(`${config.backendUrl}/user/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  const resData = await fetchApi.json();
  console.log("get result", resData);
  if (resData.success) {
    return resData.user as UserSessionType;
  }
  return null;
}

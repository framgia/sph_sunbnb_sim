"use server";

import { jwtDecode } from "jwt-decode";
import config from "../../config/config";
import type {
  UserRegisterType,
  UserSessionType,
  PasswordUpdateType
} from "../../interfaces/types";
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

  if (resData.success as boolean) {
    cookies().set("jwt", resData.token as string, {
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
  if (resData.success as boolean) {
    return resData.user as UserSessionType;
  }
  return null;
}

export async function updateUser(
  id: number,
  updatedUserData: Partial<UserSessionType>
): Promise<{ message: string; errors?: Record<string, string[]> }> {
  const jwt = cookies().get("jwt")?.value;
  if (jwt !== undefined) {
    const fetchApi = await fetch(`${config.backendUrl}/user/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(updatedUserData)
    });

    const resData = await fetchApi.json();

    if (resData.success as boolean) {
      return {
        message: "success"
      };
    } else {
      return {
        message: resData.message,
        errors: resData.errors
      };
    }
  } else {
    return {
      message: "User not authenticated"
    };
  }
}

export async function updatePassword(
  id: number,
  passwordUpdate: PasswordUpdateType
): Promise<{ message: string; errors?: Record<string, string[]> }> {
  const jwt = cookies().get("jwt")?.value;
  if (jwt !== undefined) {
    const fetchApi = await fetch(
      `${config.backendUrl}/user/change-password/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(passwordUpdate)
      }
    );

    const resData = await fetchApi.json();

    if (resData.success as boolean) {
      return {
        message: "success"
      };
    } else {
      return {
        message: resData.message,
        errors: resData.errors
      };
    }
  } else {
    return {
      message: "User not authenticated"
    };
  }
}

export async function loginWithGoogle(
  idToken: string
): Promise<{ message: string }> {
  const response = await fetch(`${config.backendUrl}/login/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ id_token: idToken })
  });
  const resData = await response.json();
  console.log("data received", resData);
  if (resData.success as boolean) {
    if (resData.user.role === null) {
      return { message: "no role" };
    } else {
      cookies().set("jwt", resData.token as string, {
        httpOnly: true,
        expires: new Date(resData.expires_in as string)
      });
      return { message: "success" };
    }
  }
  return { message: "login failed" };
}

export async function registerWithGoogle(
  idToken: string,
  userRole: string
): Promise<{ message: string }> {
  const response = await fetch(`${config.backendUrl}/register/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ id_token: idToken, role: userRole })
  });
  const resData = await response.json();
  console.log("data received", resData);
  if (resData.success as boolean) {
    const token = resData.token as string;
    const expireDate = new Date(resData.expires_in as string);
    cookies().set("jwt", token, {
      httpOnly: true,
      expires: expireDate
    });
    return { message: "success" };
  }
  return { message: "register failed" };
}

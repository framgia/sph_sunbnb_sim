"use server";

import config from "../../config/config";
import { cookies } from "next/headers";

export async function handleDelete(id: number): Promise<{ message: string }> {
  const jwt = cookies().get("jwt")?.value;
  if (jwt !== undefined) {
    console.log(jwt);
    const fetchApi = await fetch(`${config.backendUrl}/accommodation/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
    const resData = await fetchApi.json();
    console.log(resData);
    return {
      message: resData.message
    };
  } else {
    return {
      message: "Nothing to delete"
    };
  }
}

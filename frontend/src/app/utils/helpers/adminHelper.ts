import config from "@/app/config/config";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

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
  // if (resData.token !== undefined && resData.token !== "") {
  //   const decodedJwt: JwtPayloadwithUser = jwtDecode(resData.token as string);
  //   if (resData.success as boolean) {
  //     if (decodedJwt.user.role === null) {
  //       return { message: "no role" };
  //     } else {
  //       cookies().set("jwt", resData.token as string, {
  //         httpOnly: true,
  //         expires: new Date(resData.expires_in as string)
  //       });
  //       return { message: "success" };
  //     }
  //   }
  // }
  return { message: "login failed" };
}

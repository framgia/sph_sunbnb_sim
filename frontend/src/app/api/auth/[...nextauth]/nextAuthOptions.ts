import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {
  loginWithGoogle,
  registerWithGoogle
} from "../../../utils/helpers/userHelper";
import type { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export function nextAuthOptions(
  req: NextApiRequest,
  res: NextApiResponse
): NextAuthOptions {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        idToken: true,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      })
    ],
    callbacks: {
      async signIn({ account }) {
        if (
          account !== null &&
          account.provider === "google" &&
          account.id_token !== undefined
        ) {
          const role = cookies().get("userRole")?.value;
          let result = { message: "" };
          console.log("role? ", role);
          if (role !== undefined && role !== "") {
            result = await registerWithGoogle(account.id_token, role);
            if (result.message === "success") {
              cookies().delete("userRole");
              return "/";
            } else {
              result = await loginWithGoogle(account.id_token);
              console.log("message", result.message);
              if (result.message === "success") {
                cookies().delete("userRole");
                return "/";
              }
            }
          } else {
            result = await loginWithGoogle(account.id_token);
            console.log("message", result.message);
            if (result.message === "success") {
              cookies().delete("userRole");
              return "/";
            } else {
              return "/role-selection";
            }
          }
        }
        return "/";
      }
    },
    pages: {
      signIn: "/login"
    }
  };
}

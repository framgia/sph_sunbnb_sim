import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { JwtPayloadwithUser } from "./app/interfaces/types";

export function middleware(request: NextRequest): NextResponse | undefined {
  const jwt = cookies().get("jwt")?.value;
  let user = null;
  if (jwt !== undefined && jwt !== "") {
    const decodedJwt = jwtDecode(jwt) as JwtPayloadwithUser;
    if (decodedJwt.user !== undefined) {
      user = decodedJwt.user;
    }
  }

  //    if there is no user signed in
  if (user === null || user === undefined) {
    if (request.nextUrl.pathname.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/calendar")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/listings")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/signup")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/reset-password")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

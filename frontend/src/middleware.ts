import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { JwtPayloadwithUser } from "./app/interfaces/types";

export function middleware(request: NextRequest): NextResponse | undefined {
  const jwt = cookies().get("jwt")?.value;
  let user = null;
  if (jwt !== undefined && jwt !== "") {
    const decodedJwt: JwtPayloadwithUser = jwtDecode(jwt);
    if (decodedJwt.user !== undefined) {
      user = decodedJwt.user;
    }
  }

  if (user === null || user === undefined) {
    if (request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.next();
    }
    if (request.nextUrl.pathname.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/calendar")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/listings")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/history")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/approvals")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/reports")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/users")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/admin/login")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/signup")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (request.nextUrl.pathname.startsWith("/reset-password")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (
      (user.role === "guest" || user.role === "admin") &&
      (request.nextUrl.pathname.startsWith("/listings") ||
        request.nextUrl.pathname.startsWith("/calendar"))
    ) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
    if (
      (user.role === "host" || user.role === "admin") &&
      (request.nextUrl.pathname.startsWith("/accommodations") ||
        request.nextUrl.pathname.startsWith("/experiences") ||
        request.nextUrl.pathname.startsWith("/history"))
    ) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
    if (
      (user.role === "host" || user.role === "guest") &&
      (request.nextUrl.pathname.startsWith("/approvals") ||
        request.nextUrl.pathname.startsWith("/dashboard") ||
        request.nextUrl.pathname.startsWith("/reports") ||
        request.nextUrl.pathname.startsWith("/users"))
    ) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};

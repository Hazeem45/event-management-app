import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import env from "./config/env";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: env.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  const redirectToLogin = (request: NextRequest) => {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  };

  if (pathname === "/auth/login" || pathname === "/auth/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return redirectToLogin(request);
    }

    if (token.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/member")) {
    if (!token) {
      return redirectToLogin(request);
    }

    if (pathname === "/member") {
      return NextResponse.redirect(new URL("/member/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/member/:path*"],
};

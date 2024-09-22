import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request?.nextUrl.pathname;

  let isPublicPath = path === "/login" || path === "/signup";

  const token = cookies().get("token")?.value || "";

  if ((path === "/login" || path === "/signup") && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/todo"],
};

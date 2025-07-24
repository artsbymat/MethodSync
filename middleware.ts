import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/challenge", "/profile", '/history'];


const authPages = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("sb-access-token")?.value;
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const isAuthPage = authPages.includes(pathname);

  if (isAuthPage && token) {
    const dashboardUrl = new URL("/challenge", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}


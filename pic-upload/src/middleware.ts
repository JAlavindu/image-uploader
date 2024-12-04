// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Example middleware to redirect unauthenticated users trying to access /dashboard
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Paths that require authentication
  const protectedPaths = ["/dashboard"];

  // If the request is for a protected path
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // Check for the presence of a token (e.g., Supabase token stored in cookies)
    const token = req.cookies.get("sb:token")?.value;

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth";
      return NextResponse.redirect(url);
    }

    // Optionally, verify the token with Supabase or your backend here
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

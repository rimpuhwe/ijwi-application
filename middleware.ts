import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = request.cookies.get("admin_session")
  const isLoggedIn = session?.value === "authenticated"

  // Redirect to login if accessing admin routes without auth
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // Redirect to dashboard if already logged in and trying to access login
  if (pathname.startsWith("/admin/login") && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

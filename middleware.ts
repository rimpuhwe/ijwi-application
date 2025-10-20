import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  // NOTE: temporarily disable middleware redirect to avoid 307 loops while
  // server-side session cookie handling is being implemented. This makes
  // admin routes accessible during development — re-enable with proper
  // server cookie/session handling for production.
  const res = NextResponse.next();
  try {
    const supabase = createMiddlewareClient({ req, res });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    // Log session presence for debugging (no redirect enforced)
    console.log('[middleware] session present:', !!session, 'path:', req.nextUrl.pathname);
  } catch (err) {
    // If middleware setup fails (missing helpers, etc.), don't block requests
    console.warn('[middleware] skipping session check due to error', err);
  }

  return res;
}
export const config = {
  matcher: ["/admin/:path*"],
};

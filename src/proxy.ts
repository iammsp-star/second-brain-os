import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// In-memory rate limiting store (IP -> { count, resetTime })
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // Allow max 5 attempts per minute per IP

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "127.0.0.1";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limitInfo = rateLimitStore.get(ip);

  if (!limitInfo) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (now > limitInfo.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  limitInfo.count += 1;
  return limitInfo.count > MAX_REQUESTS;
}

export async function proxy(request: NextRequest) {
  const ip = getClientIp(request);
  const path = request.nextUrl.pathname;

  // Apply rate limiting on POST requests (Server Actions) to the login endpoint
  if (path === "/login" && request.method === "POST") {
    if (isRateLimited(ip)) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Too many login attempts. Please try again in a minute.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (svg, png, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

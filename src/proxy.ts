import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/project",
  "/project-epics",
  "/project-tasks",
  "/project-members",
  "/project-details",
  "/project",
];

const authRoutes = [
  "/login",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

/**
 * Decodes and validates a JWT's expiration without requiring the secret key.
 * Returns true if the token exists, is not malformed, and is not expired.
 */
function isTokenValid(token: string | undefined): boolean {
  if (!token) return false;

  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return false;

    const payload = JSON.parse(atob(payloadBase64));

    // Check expiration — add a 30-second buffer to avoid edge cases
    return payload.exp * 1000 > Date.now() + 30_000;
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const isAuthenticated =
    isTokenValid(accessToken) || isTokenValid(refreshToken);

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/projects", request.url));
  }

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

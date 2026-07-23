/**
 * getServerSession
 *
 * Reads authentication tokens from the incoming request's cookies on the server side.
 *
 * Use in Server Components to:
 * - Check authentication status before rendering
 * - Pass the access token to `serverApiClient` for data fetching
 *
 * Usage:
 * ```ts
 * const session = await getServerSession();
 * if (!session) redirect("/login");
 * const data = await serverApiClient("/rest/v1/projects", { accessToken: session.accessToken });
 * ```
 *
 * Note: This uses the standard `next/headers` cookies() API
 * which is only available in Server Components, Route Handlers,
 * and Server Actions.
 */

import { cookies } from "next/headers";

export interface ServerSession {
  accessToken: string;
  refreshToken: string | undefined;
}

export async function getServerSession(): Promise<ServerSession | null> {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!accessToken) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
    };
  } catch {
    // cookies() may throw if called outside of a request context
    return null;
  }
}

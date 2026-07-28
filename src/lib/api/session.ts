import { cookies } from "next/headers";

export interface ServerSession {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export async function getSession(): Promise<ServerSession | null> {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get(ACCESS_TOKEN)?.value,
    refreshToken: cookieStore.get(REFRESH_TOKEN)?.value,
  };
}
export async function setSession(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  cookieStore.set(ACCESS_TOKEN, accessToken, options);
  cookieStore.set(REFRESH_TOKEN, refreshToken, options);
}

export async function clearSession() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN);
  cookieStore.delete(REFRESH_TOKEN);
}

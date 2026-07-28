import { setSession, clearSession, getSession } from "./session";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

export async function refreshAccessToken() {
  const session = await getSession();

  if (!session) {
    throw new Error("No refresh token");
  }

  const response = await fetch(
    `${API_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: "POST",
      headers: {
        Apikey: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: session.refreshToken,
      }),
    },
  );

  if (!response.ok) {
    await clearSession();
    throw new Error("Session expired");
  }

  const data: RefreshResponse = await response.json();

  await setSession(data.access_token, data.refresh_token);

  return data.access_token;
}

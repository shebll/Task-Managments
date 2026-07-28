import { refreshAccessToken } from "./refreshToken";
import { clearSession, getSession } from "./session";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

export async function serverApiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthenticated");
  }

  let accessToken = session.accessToken;

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      Apikey: API_KEY,
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options?.headers,
    },
  });

  if (response.status === 401) {
    try {
      accessToken = await refreshAccessToken();

      response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          Apikey: API_KEY,
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          ...options?.headers,
        },
      });
    } catch (error) {
      await clearSession();

      throw new Error("Session expired");
    }
  }

  if (response.status === 201) {
    return undefined as T;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg ?? "Something went wrong");
  }

  return data;
}

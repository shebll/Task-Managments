import { cookies } from "next/headers";
import { getServerSession } from "./get-server-session";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

async function refreshServerAccessToken(): Promise<string> {
  const session = await getServerSession();

  if (!session?.refreshToken) {
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
    throw new Error("Refresh failed");
  }

  const data: LoginResponse = await response.json();

  const cookieStore = await cookies();

  cookieStore.set("access_token", data.access_token, {
    httpOnly: false,
    path: "/",
  });

  cookieStore.set("refresh_token", data.refresh_token, {
    httpOnly: false,
    path: "/",
  });

  return data.access_token;
}

export async function serverApiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const session = await getServerSession();

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
      accessToken = await refreshServerAccessToken();

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
      console.log(error);
      const cookieStore = await cookies();

      // cookieStore.delete("access_token");
      // cookieStore.delete("refresh_token");

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

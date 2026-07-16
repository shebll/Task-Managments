import { authStorage } from "@/features/auth/lib/authStorage";
import { LoginResponse } from "@/features/auth/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      Apikey: API_KEY || "",
      "Content-Type": "application/json",
      ...(authStorage.getAccessToken() && {
        Authorization: `Bearer ${authStorage.getAccessToken()}`,
      }),
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (response.status === 401) {
    try {
      const refreshResponse = await apiClient<LoginResponse>(
        "/auth/v1/token?grant_type=refresh_token",
        {
          method: "POST",
          body: JSON.stringify({
            refresh_token: authStorage.getRefreshToken(),
          }),
        },
      );

      authStorage.setTokens(
        refreshResponse.access_token,
        refreshResponse.refresh_token,
      );

      return apiClient<T>(endpoint, options);
    } catch {
      authStorage.clearTokens();
      authStorage.clearUserData();

      window.location.href = "/login";

      throw new Error("Session expired");
    }
  }
  if (!response.ok) {
    throw new Error(data.msg || "Something went wrong");
  }

  return data;
}

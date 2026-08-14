import { authStorage } from "@/features/auth/lib/authStorage";
import { LoginResponse } from "@/features/auth/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export type PaginatedResponse<T> = {
  data: T;
  total: number;
  start: number;
  end: number;
};

function parseContentRange(contentRange: string | null) {
  if (!contentRange) {
    throw new Error("Content-Range header is missing");
  }

  const [range, totalCount] = contentRange.split("/");

  if (!range || !totalCount) {
    throw new Error("Invalid Content-Range header");
  }

  const [start, end] = range.split("-").map(Number);
  const total = Number(totalCount);

  if (Number.isNaN(start) || Number.isNaN(end) || Number.isNaN(total)) {
    throw new Error("Invalid Content-Range header");
  }

  return { start, end, total };
}

/**
 * Refreshes the access token using the refresh token.
 * Uses a plain fetch to avoid the 401 interceptor (prevents infinite recursion).
 */
async function refreshAccessToken(): Promise<LoginResponse> {
  const refreshToken = authStorage.getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await fetch(
    `${API_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: "POST",
      headers: {
        Apikey: API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    },
  );

  if (!response.ok) {
    throw new Error("Token refresh failed");
  }

  return response.json();
}

type ApiClientOptions = RequestInit & {
  paginated?: boolean;
};

export async function apiClient<T>(
  endpoint: string,
  options?: ApiClientOptions & { paginated: true },
): Promise<PaginatedResponse<T>>;
export async function apiClient<T>(
  endpoint: string,
  options?: ApiClientOptions,
): Promise<T>;
export async function apiClient<T>(
  endpoint: string,
  options?: ApiClientOptions,
): Promise<T | PaginatedResponse<T>> {
  const { paginated, ...fetchOptions } = options ?? {};

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers: {
      Apikey: API_KEY || "",
      "Content-Type": "application/json",
      ...(paginated ? { Prefer: "count=exact" } : {}),
      ...(authStorage.getAccessToken() && {
        Authorization: `Bearer ${authStorage.getAccessToken()}`,
      }),
      ...fetchOptions.headers,
    },
  });
  if (response.status === 201 || response.status === 204) {
    return undefined as T;
  }
  const data = await response.json();

  if (response.status === 401) {
    try {
      const refreshResponse = await refreshAccessToken();

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

  if (paginated) {
    const { start, end, total } = parseContentRange(
      response.headers.get("Content-Range"),
    );

    return {
      data,
      total,
      start,
      end,
    };
  }

  return data;
}

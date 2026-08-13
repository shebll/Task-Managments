import { refreshAccessToken } from "./refreshToken";
import { clearSession, getSession } from "./session";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

type ServerApiOptions = RequestInit & {
  includeResponse?: boolean;
  paginated?: boolean;
};

type ServerApiResponse<T> = {
  data: T;
  response: Response;
};

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

export async function serverApiClient<T>(
  endpoint: string,
  options?: ServerApiOptions,
): Promise<T | ServerApiResponse<T> | PaginatedResponse<T>> {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthenticated");
  }

  let accessToken = session.accessToken;
  const { includeResponse, paginated, ...fetchOptions } = options ?? {};

  const buildHeaders = (token: string | undefined) => ({
    Apikey: API_KEY,
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...(paginated ? { Prefer: "count=exact" } : {}),
    ...fetchOptions.headers,
  });

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers: buildHeaders(accessToken),
  });

  if (response.status === 401) {
    try {
      accessToken = await refreshAccessToken();

      response = await fetch(`${API_URL}${endpoint}`, {
        ...fetchOptions,
        headers: buildHeaders(accessToken),
      });
    } catch (error) {
      await clearSession();

      throw new Error("Session expired");
    }
  }

  if (response.status === 201) {
    if (includeResponse) {
      return {
        data: undefined as T,
        response,
      };
    }

    return undefined as T;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg ?? "Something went wrong");
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
    } as PaginatedResponse<T>;
  }

  if (includeResponse) {
    return {
      data,
      response,
    } as ServerApiResponse<T>;
  }

  return data as T;
}

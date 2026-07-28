import { User } from "../types/types";

export const authStorage = {
  getAccessToken: () => getCookie("access_token"),
  getRefreshToken: () => getCookie("refresh_token"),

  setTokens: (
    access_token: string,
    refresh_token: string,
    rememberMe?: boolean,
  ) => {
    const cookiesConfig = rememberMe
      ? { maxAge: 60 * 60 * 24 * 30 }
      : undefined;
    setCookie("access_token", access_token, cookiesConfig);
    setCookie("refresh_token", refresh_token, cookiesConfig);
  },

  clearTokens: () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
  },

  setUserData: (user: User) =>
    localStorage.setItem("userData", JSON.stringify(user)),
  getUserData: (): User | null => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("userData");
    return data ? (JSON.parse(data) as User) : null;
  },

  clearUserData: () => localStorage.removeItem("userData"),
};
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;

  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return value?.split("=")[1];
}

function setCookie(name: string, value: string, options?: { maxAge?: number }) {
  let cookie = `${name}=${encodeURIComponent(value)}; path=/`;

  if (options?.maxAge) {
    cookie += `; max-age=${options.maxAge}`;
  }

  document.cookie = cookie;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

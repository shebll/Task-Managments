import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { User } from "../types/types";

export const authStorage = {
  getAccessToken: () => getCookie("access_token"),
  getRefreshToken: () => getCookie("refresh_token"),

  setTokens: (access_token: string, refresh_token: string) => {
    setCookie("access_token", access_token);
    setCookie("refresh_token", refresh_token);
  },

  clearTokens: () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
  },

  setUserData: (user: User) =>
    localStorage.setItem("userData", JSON.stringify(user)),
  getUserData: () => localStorage.getItem("userData"),

  clearUserData: () => localStorage.removeItem("userData"),
};

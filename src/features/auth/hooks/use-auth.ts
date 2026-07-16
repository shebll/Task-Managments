import { useState } from "react";
import { User } from "../types/types";
import { authStorage } from "../lib/authStorage";

export function useAuth() {
  const [user, setUser] = useState<User | null>();

  const login = (
    user: User,
    access_token: string,
    refresh_token: string,
    rememberMe?: boolean,
  ) => {
    authStorage.setTokens(access_token, refresh_token, rememberMe);
    setUser(user);
    authStorage.setUserData(user);
  };

  const logout = () => {
    authStorage.clearTokens();
    authStorage.clearUserData();
    setUser(null);
  };

  return {
    login,
    logout,
    user,
    isAuthenticated: !!authStorage.getAccessToken(),
  };
}

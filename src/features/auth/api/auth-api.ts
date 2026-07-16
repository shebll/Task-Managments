import { apiClient } from "@/lib/api/api-client";
import {
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from "../types/types";

export function signup(data: SignUpRequest) {
  return apiClient<SignUpResponse>("/auth/v1/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function login(data: LoginRequest) {
  return apiClient<LoginResponse>("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

import { loginSchema } from "@/features/auth/schema/login-schema";
import { signUpSchema } from "@/features/auth/schema/sign-up-schema";
import z from "zod";
import { forgetPasswordSchema } from "../schema/reset-password-schema";
import { resetPasswordSchema } from "../schema/restPasswordSchema";

export type signUpType = z.infer<typeof signUpSchema>;

export type loginType = z.infer<typeof loginSchema>;
export type forgetPasswordType = z.infer<typeof forgetPasswordSchema>;
export type ForgetPasswordData = {
  email: string;
  resendCount: number;
  expireAt: number;
};
export type LoginRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  data: {
    name: string;
    department: string;
  };
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
  user: User;
};
export type resetPasswordType = z.infer<typeof resetPasswordSchema>;

export type LoginResponse = AuthResponse;
export type SignUpResponse = AuthResponse;

export type User = {
  id: string;
  email: string;
  role: string;

  user_metadata: {
    name: string;
    department: string;
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
  };

  created_at: string;
  updated_at: string;
};

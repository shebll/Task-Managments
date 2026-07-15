import { loginSchema } from "@/features/auth/schema/login-schema";
import { signUpSchema } from "@/features/auth/schema/sign-up-schema";
import z from "zod";
export type signUpType = z.infer<typeof signUpSchema>;
export type loginType = z.infer<typeof loginSchema>;

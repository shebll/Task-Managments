import * as z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Minimum 8 characters")
      .max(64, "Maximum 64 characters")
      .regex(/^\S+$/, "Password cannot contain spaces")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[0-9]/, "Must contain a number")
      .regex(/[!@#$%^&*]/, "Must contain a special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

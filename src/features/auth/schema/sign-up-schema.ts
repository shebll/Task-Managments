import * as z from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .regex(
        /^[\p{L}]+(?: [\p{L}]+)*$/u,
        "Only letters and single spaces are allowed",
      ),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    jobTitle: z.string().optional(),
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

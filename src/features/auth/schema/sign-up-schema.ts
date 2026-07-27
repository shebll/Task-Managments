import * as z from "zod";
import { confirmPasswordSchema } from "./confirmPasswordSchema";

export const signUpSchema = confirmPasswordSchema.extend({
  name: z
    .string()
    .trim()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .regex(
      /^[\p{L}]+(?: [\p{L}]+)*$/u,
      "Only letters and single spaces are allowed",
    ),
  email: z.email("Invalid email address"),
  jobTitle: z.string().optional(),
});
export { confirmPasswordSchema };

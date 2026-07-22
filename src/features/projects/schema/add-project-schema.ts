import * as z from "zod";

export const addProjectSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters" })
    .max(100, { message: "Maximum 100 characters" }),
  description: z
    .string()
    .max(500, { message: "Maximum 500 characters" })
    .optional(),
});

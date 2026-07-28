import { z } from "zod";

export const epicSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  assignee_id: z.string().optional(),
  deadline: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const deadline = new Date(value);
      deadline.setHours(0, 0, 0, 0);

      return deadline >= today;
    }, "Deadline must be today or later"),
});

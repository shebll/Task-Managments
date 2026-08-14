import { z } from "zod";
import { TASK_STATUSES } from "../types/task";

export const addTaskSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  epic_id: z.string().optional(),
  assignee_id: z.string().optional(),
  due_date: z.string().optional(),
  status: z.enum(TASK_STATUSES),
});

export type AddTaskFormValues = z.infer<typeof addTaskSchema>;

import { apiClient } from "@/lib/api/api-client";
import { CreateTaskRequest } from "../types/task";

export function createTask(data: CreateTaskRequest) {
  return apiClient<void>("/rest/v1/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

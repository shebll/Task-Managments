import { apiClient } from "@/lib/api/api-client";
import { CreateEpicRequest, UpdateEpicRequest } from "../types/Epic";

export function createEpic(data: CreateEpicRequest) {
  return apiClient<void>("/rest/vd1/epics", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateEpic(epicId: string, data: UpdateEpicRequest) {
  return apiClient<void>(`/rest/v1/epics?id=eq.${epicId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

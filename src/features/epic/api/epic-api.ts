import { apiClient } from "@/lib/api/api-client";
import {
  CreateEpicRequest,
  EpicsResponse,
  UpdateEpicRequest,
} from "../types/Epic";
import { MembersResponse } from "@/features/members/types/Member";

export function createEpic(data: CreateEpicRequest) {
  return apiClient<void>("/rest/v1/epics", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateEpic(epicId: string, data: UpdateEpicRequest) {
  return apiClient<void>(`/rest/v1/epics?id=eq.${epicId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function getEpicDetails(epicId: string, projectId: string) {
  return apiClient<EpicsResponse>(
    `/rest/v1/project_epics?project_id=eq.${projectId}&id=${epicId}`,
    {
      method: "GET",
    },
  );
}
export function getMembersClient(projectId: string) {
  return apiClient<MembersResponse>(
    `/rest/v1/get_project_members?project_id=eq.${projectId}`,
    {
      method: "GET",
      next: {
        tags: [`member-${projectId}`],
      },
    },
  );
}

export const getEpicsClient = async (
  projectId: string,
  limit: number,
  offset: number,
): Promise<{ epics: EpicsResponse; total: number }> => {
  const response = (await apiClient<EpicsResponse>(
    `/rest/v1/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      paginated: true,
    },
  )) as { data: EpicsResponse; total: number };

  return {
    epics: response.data,
    total: response.total,
  };
};

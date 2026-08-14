import {
  PaginatedResponse,
  serverApiClient,
} from "@/lib/api/server-api-client";
import { EpicsResponse } from "../types/Epic";

export const getEpics = async (
  projectId: string,
  limit: number,
  offset: number,
): Promise<{
  epics: EpicsResponse;
  total: number;
  start: number;
  end: number;
}> => {
  const response = (await serverApiClient<EpicsResponse>(
    `/rest/v1/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      paginated: true,
      next: {
        tags: ["project"],
      },
    },
  )) as PaginatedResponse<EpicsResponse>;

  return {
    epics: response.data,
    total: response.total,
    start: response.start,
    end: response.end,
  };
};

export const getAllEpics = async (
  projectId: string,
): Promise<EpicsResponse> => {
  return (await serverApiClient<EpicsResponse>(
    `/rest/v1/project_epics?project_id=eq.${projectId}&select=id,epic_id,title`,
    {
      method: "GET",
      next: {
        tags: ["project"],
      },
    },
  )) as EpicsResponse;
};

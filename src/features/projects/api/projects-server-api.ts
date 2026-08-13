import {
  PaginatedResponse,
  serverApiClient,
} from "@/lib/api/server-api-client";
import { ProjectsData } from "../types/types";

export const getProjectById = (id: string) => {
  return serverApiClient<ProjectsData>(
    `/rest/v1/rpc/get_projects?id=eq.${id}`,
    {
      method: "GET",
      next: {
        tags: [`project-${id}`],
      },
    },
  );
};

export const getProjects = async (
  limit: number,
  offset: number,
): Promise<{
  projects: ProjectsData;
  total: number;
  start: number;
  end: number;
}> => {
  const response = (await serverApiClient<ProjectsData>(
    `/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`,

    {
      method: "GET",
      paginated: true,
      includeResponse: true,
      next: {
        tags: ["project"],
      },
    },
  )) as PaginatedResponse<ProjectsData>;

  return {
    projects: response.data,
    total: response.total,
    start: response.start,
    end: response.end,
  };
};

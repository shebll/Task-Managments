import { apiClient } from "@/lib/api/api-client";
import { AddProjectType, ProjectsData } from "../types/types";

export const addProject = (addProjectData: AddProjectType) => {
  return apiClient<void>("/rest/v1/projects", {
    method: "POST",
    body: JSON.stringify(addProjectData),
  });
};

export const updateProject = (
  addProjectData: AddProjectType,
  projectId: string,
) => {
  return apiClient<void>(`/rest/v1/projects?id=eq.${projectId}`, {
    method: "PATCH",
    body: JSON.stringify(addProjectData),
  });
};

export const getProjectsClient = async (
  limit: number,
  offset: number,
): Promise<{ projects: ProjectsData; total: number }> => {
  const response = (await apiClient<ProjectsData>(
    `/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`,
    {
      method: "GET",
      paginated: true,
    },
  )) as { data: ProjectsData; total: number };

  return {
    projects: response.data,
    total: response.total,
  };
};

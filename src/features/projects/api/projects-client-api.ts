import { apiClient } from "@/lib/api/api-client";
import { AddProjectType } from "../types/types";

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

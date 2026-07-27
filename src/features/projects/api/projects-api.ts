import { apiClient } from "@/lib/api/api-client";
import { AddProjectType } from "../types/types";

export const addProject = (addProjectData: AddProjectType) => {
  return apiClient<void>("/rest/v1/projects", {
    method: "POST",
    body: JSON.stringify(addProjectData),
  });
};

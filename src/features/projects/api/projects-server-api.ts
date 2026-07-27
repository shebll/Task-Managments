import { serverApiClient } from "@/lib/api/server-api-client";
import { ProjectsData } from "../types/types";

export const getProjectById = (id: string) => {
  return serverApiClient<ProjectsData>(
    `/rest/v1/rpc/get_projects?id=eq.${id}`,
    {
      method: "GET",
    },
  );
};

export const getProjects = () => {
  return serverApiClient<ProjectsData>("/rest/v1/rpc/get_projects", {
    method: "GET",
    cache: "no-cache",
  });
};

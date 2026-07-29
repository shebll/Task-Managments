import { serverApiClient } from "@/lib/api/server-api-client";
import { EpicsResponse } from "../types/Epic";

export const getEpics = (projectId: string) => {
  return serverApiClient<EpicsResponse>(
    `/rest/v1/project_epics?project_id=eq.${projectId}`,
    {
      method: "GET",
      next: {
        tags: ["project"],
      },
    },
  );
};

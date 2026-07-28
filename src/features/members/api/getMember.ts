import { serverApiClient } from "@/lib/api/server-api-client";
import { MembersResponse } from "../types/Member";

export function getMembers(projectId: string) {
  return serverApiClient<MembersResponse>(
    `/rest/v1/get_project_members?project_id=eq.${projectId}`,
    {
      method: "GET",
      next: {
        tags: [`member-${projectId}`],
      },
    },
  );
}

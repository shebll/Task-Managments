import React from "react";
import { getMembers } from "../api/getMember";

async function ListMember({ projectId }: { projectId: string }) {
  const members = await getMembers(projectId);
  console.log(members);
  return <div></div>;
}

export default ListMember;

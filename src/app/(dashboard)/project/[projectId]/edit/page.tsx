import React from "react";
type Props = {
  params: Promise<{
    projectId: string;
  }>;
};
async function page({ params }: Props) {
  const { projectId } = await params;
  return <div>projects {projectId}</div>;
}

export default page;

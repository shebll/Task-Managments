import AddProjectForm from "@/features/projects/components/AddProjectForm";
import React from "react";

function page() {
  return (
    <div className="h-full flex flex-col gap-10">
      <h1 className="text-4xl font-semibold ">Add New Project</h1>
      <AddProjectForm />
    </div>
  );
}

export default page;

import ProjectForm from "@/features/projects/components/ProjectForm";

function page() {
  return (
    <div className="h-full flex flex-col gap-10">
      <h1 className="text-4xl font-semibold ">Add New Project</h1>
      <ProjectForm />
    </div>
  );
}

export default page;

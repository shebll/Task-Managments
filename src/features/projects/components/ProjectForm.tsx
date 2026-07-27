"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { AddProjectType, ProjectsData } from "../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProjectSchema } from "../schema/add-project-schema";
import { useAddProject } from "../hooks/useAddProject";
import Button from "@/components/ui/Button";
import FormField from "@/features/auth/components/FormField";
import Image from "next/image";
import Link from "next/link";
import TextAreaInput from "./ui/TextAreaInput";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { updateProject } from "../api/projects-client-api";

function ProjectForm({ projectData }: { projectData?: ProjectsData }) {
  const updateProjectMutation = useMutation({
    mutationFn: ({
      projectData,
      projectId,
    }: {
      projectData: AddProjectType;
      projectId: string;
    }) => updateProject(projectData, projectId),
  });
  const addProjectMutation = useAddProject();

  const formData = useForm<AddProjectType>({
    defaultValues: projectData
      ? {
          name: projectData[0].name,
          description: projectData[0].description,
        }
      : undefined,
    mode: "onChange",
    resolver: zodResolver(addProjectSchema),
  });

  const handleSubmit: SubmitHandler<AddProjectType> = (
    data: AddProjectType,
  ) => {
    if (projectData) {
      updateProjectMutation.mutate(
        {
          projectData: data,
          projectId: projectData[0].id,
        },
        {
          onSuccess: (response) => {
            toast.success("Project updated successfully!");
          },

          onError: (error) => {
            console.log(error);
            formData.setError("root", { message: error.message });
          },
        },
      );
    } else {
      addProjectMutation.mutate(data, {
        onSuccess: (response) => {
          formData.reset();
          toast.success("Project created successfully!");
        },

        onError: (error) => {
          console.log(error);
          formData.setError("root", { message: error.message });
        },
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex w-full max-w-2xl flex-col">
        <div className="bg-card-background p-8 pb-10 rounded-sm flex gap-4 items-center justify-start w-full border-b border-border-divider rounded-b-none">
          <div className="rounded-sm p-3 bg-bg-avatar/15 w-fit  ">
            <Image
              src={"/assets/icons/add-project.svg"}
              height={22}
              width={22}
              alt="add new project icon"
            />
          </div>
          <div className="">
            <h2 className="font-semibold text-xl">Initialize New Project</h2>
            <p className="text-text-placeholder text-sm">
              Define the scope and foundational details of your project.
            </p>
          </div>
        </div>
        <form
          onSubmit={formData.handleSubmit(handleSubmit)}
          className="flex flex-col items-center  w-full bg-card-background p-8 gap-8"
        >
          {/* Form Fields for title */}
          <FormField
            formdata={formData}
            name="name"
            type="string"
            label={"Project TITLE *"}
            minLength={3}
            maxLength={100}
            placeholder="Project title"
          />
          <TextAreaInput formData={formData} />

          {formData.formState.errors.root && (
            <p className="w-full rounded-sm bg-bg-error pb-3.5 pt-3.5 pr-4 pl-4 text-sm text-error">
              {formData.formState.errors.root.message}
            </p>
          )}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href={"/project"}>
              <Button variant="secondary">Back</Button>
            </Link>
            <Button
              loading={
                projectData
                  ? updateProjectMutation.isPending
                  : addProjectMutation.isPending
              }
              variant="primary"
            >
              Create Account
            </Button>
          </div>
        </form>
        <div className="flex items-center gap-3 p-6 rounded-sm rounded-t-none border-t border-border-divider bg-blue-100">
          <Image
            src={"/assets/icons/tip-icon.svg"}
            height={12}
            width={14}
            alt="pro tip icon"
          />
          <p className="text-xs text-text-muted">
            <span className="font-bold">Pro Tip:</span> You can invite project
            members and assign epics immediately after the initial creation
            process.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;

"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/Button";
import FormField from "@/features/auth/components/FormField";
import { useToast } from "@/provider/ToastProvider";

import { EpicFormValues, EpicResponse } from "../types/Epic";
import { epicSchema } from "../schema/add-epic-schema";
import { createEpic, updateEpic } from "../api/epic-api";
import TextAreaInput from "@/features/projects/components/ui/TextAreaInput";
import SelectField from "./SelectField";
import { MembersResponse } from "@/features/members/types/Member";

type Props = {
  projectId: string;
  members: MembersResponse;
  epic?: EpicResponse;
};

export default function EpicForm({ projectId, epic, members }: Props) {
  const { showToast } = useToast();

  const form = useForm<EpicFormValues>({
    resolver: zodResolver(epicSchema),
    mode: "onChange",
    defaultValues: epic
      ? {
          title: epic.title,
          description: epic.description ?? "",
          assignee_id: epic.assignee?.sub ?? "",
          deadline: epic.deadline ?? "",
        }
      : {
          title: "",
          description: "",
          assignee_id: "",
          deadline: "",
        },
  });

  const onSubmit: SubmitHandler<EpicFormValues> = async (data) => {
    try {
      if (epic) {
        await updateEpic(epic.id, {
          title: data.title,
          description: data.description,
          assignee_id: data.assignee_id || undefined,
          deadline: data.deadline || undefined,
        });

        showToast("Epic updated successfully");
      } else {
        await createEpic({
          title: data.title,
          description: data.description || undefined,
          assignee_id: data.assignee_id || undefined,
          deadline: data.deadline || undefined,
          project_id: projectId,
        });

        showToast("Epic created successfully");
      }
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Something went wrong!",
      });
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6 bg-card-background p-10 max-w-4xl w-full"
    >
      <FormField
        formData={form}
        name="title"
        label="Epic Title *"
        placeholder="e.g. Structural Foundation Phase"
      />

      <TextAreaInput
        formData={form}
        name="description"
        label="Description"
        placeholder="Describe the scope and objectives of this epic..."
      />

      <SelectField
        formData={form}
        name="assignee_id"
        label="Assignee"
        placeholder="Select member"
        options={members.map((member) => ({
          label: member.metadata.name,
          value: member.user_id,
        }))}
      />

      <FormField formData={form} name="deadline" type="date" label="Deadline" />

      {form.formState.errors.root && (
        <p className="rounded-sm bg-bg-error p-4 text-error">
          {form.formState.errors.root.message}
        </p>
      )}

      <div className="flex justify-between">
        <Link href={`/project/${projectId}/epics`}>
          <Button variant="secondary">Cancel</Button>
        </Link>

        <Button
          loading={form.formState.isSubmitting}
          variant="primary"
          type="submit"
        >
          {epic ? "Save Changes" : "Create Epic"}
        </Button>
      </div>
    </form>
  );
}

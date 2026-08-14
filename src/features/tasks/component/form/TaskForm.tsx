"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import FormField from "@/features/auth/components/FormField";
import TextAreaInput from "@/features/projects/components/ui/TextAreaInput";
import SelectField from "@/features/epic/component/ui/SelectField";
import { useToast } from "@/provider/ToastProvider";

import { AddTaskFormValues, addTaskSchema } from "../../schema/add-task-schema";
import { createTask } from "../../api/task-api";
import { TASK_STATUSES } from "../../types/task";
import { formatStatus, truncateEpicTitle } from "../../lib/helper";
import { EpicsResponse } from "@/features/epic/types/Epic";
import { MembersResponse } from "@/features/members/types/Member";

type Props = {
  projectId: string;
  epics: EpicsResponse;
  members: MembersResponse;
  preselectedEpicId?: string;
};

export default function TaskForm({
  projectId,
  epics,
  members,
  preselectedEpicId,
}: Props) {
  const { showToast } = useToast();
  const router = useRouter();

  const form = useForm<AddTaskFormValues>({
    resolver: zodResolver(addTaskSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      epic_id: preselectedEpicId ?? "",
      assignee_id: "",
      due_date: "",
      status: "TO_DO",
    },
  });

  const onSubmit: SubmitHandler<AddTaskFormValues> = async (data) => {
    try {
      await createTask({
        project_id: projectId,
        title: data.title,
        description: data.description || undefined,
        epic_id: data.epic_id || undefined,
        assignee_id: data.assignee_id || undefined,
        due_date: data.due_date || undefined,
        status: data.status,
      });

      showToast("Task created successfully", "success");

      router.push(`/project/${projectId}/tasks`);
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
      className="flex flex-col gap-8 bg-card-background p-8 w-full shadow-md rounded-md"
    >
      <FormField
        formData={form}
        name="title"
        label="Task Title *"
        placeholder="e.g. Implement user authentication"
      />

      <TextAreaInput
        formData={form}
        name="description"
        label="Description"
        placeholder="Describe the task and its acceptance criteria..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          formData={form}
          name="epic_id"
          label="Epic"
          placeholder="Select epic (optional)"
          options={epics.map((epic) => ({
            label: `${epic.epic_id} ${truncateEpicTitle(epic.title)}`,
            value: epic.id,
          }))}
        />

        <SelectField
          formData={form}
          name="assignee_id"
          label="Assignee"
          placeholder="Select member (optional)"
          options={members.map((member) => ({
            label: member.metadata.name,
            value: member.user_id,
          }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          formData={form}
          name="status"
          label="Status"
          placeholder="Select status"
          options={TASK_STATUSES.map((status) => ({
            label: formatStatus(status),
            value: status,
          }))}
        />

        <FormField
          formData={form}
          name="due_date"
          type="datetime-local"
          label="Due Date"
        />
      </div>

      {form.formState.errors.root && (
        <p className="rounded-sm bg-bg-error p-4 text-error">
          {form.formState.errors.root.message}
        </p>
      )}

      <div className="flex justify-end gap-4">
        <Link href={`/project/${projectId}/tasks`}>
          <Button variant="secondary">Cancel</Button>
        </Link>

        <Button
          loading={form.formState.isSubmitting}
          variant="primary"
          type="submit"
        >
          Create Task
        </Button>
      </div>
    </form>
  );
}

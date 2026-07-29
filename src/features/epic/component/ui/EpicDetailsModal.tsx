"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/ui/Button";

import { epicSchema } from "../../schema/add-epic-schema";
import { EpicFormValues, EpicResponse } from "../../types/Epic";
import { ClosedCaption } from "lucide-react";
import { formatDate } from "../../lib/helper";

type Props = {
  open: boolean;
  epic: EpicResponse;
  onClose: () => void;
};

export default function EpicDetailsModal({ open, epic, onClose }: Props) {
  const form = useForm<EpicFormValues>({
    resolver: zodResolver(epicSchema),
    defaultValues: {
      title: epic.title,
      description: epic.description ?? "",
      assignee_id: epic.assignee?.sub ?? "",
      deadline: epic.deadline ?? "",
    },
  });

  async function onSubmit(data: EpicFormValues) {
    // updateEpic(...)
    // toast
    // onClose()
  }

  return (
    // <Dialog open={open} onClose={onClose}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-8"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-primary">
          {epic.epic_id}
        </span>

        <button type="button" onClick={onClose}>
          <ClosedCaption />
        </button>
      </div>

      {/* Title */}
      <input
        {...form.register("title")}
        className="h-12 w-full rounded-lg border px-4 text-2xl font-semibold"
      />

      {/* Description */}
      <textarea
        {...form.register("description")}
        rows={5}
        className="w-full rounded-lg border p-4 resize-none"
      />
      <div className="grid grid-cols-2 gap-6 rounded-xl border border-border-divider bg-card-background p-5 lg:grid-cols-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase text-text-muted">
            Created By
          </p>

          <p className="font-medium">{epic.created_by.name}</p>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase text-text-muted">
            Created At
          </p>

          <p>{formatDate(epic.created_at)}</p>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase text-text-muted">
            Assignee
          </p>

          {/* <SelectField
              label=""
              formData={form}
              name="assignee_id"
              placeholder="Select member"
              options={members.map((member) => ({
                label: member.metadata.name,
                value: member.user_id,
              }))}
            /> */}
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase text-text-muted">
            Deadline
          </p>

          <input
            type="date"
            {...form.register("deadline")}
            className="w-full rounded-lg border border-border-divider bg-background px-3 py-2 outline-none"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border-divider" />

      {/* Tasks */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tasks</h3>

          <Button type="button" variant="secondary">
            + Add Task
          </Button>
        </div>

        <div className="flex min-h-56 items-center justify-center rounded-xl border border-dashed border-border-divider bg-background">
          <div className="text-center">
            <p className="font-medium">No tasks yet</p>

            <p className="mt-2 text-sm text-text-secondary">
              Create the first task for this epic.
            </p>
          </div>
        </div>
      </section>
      <div className="flex justify-end gap-3 border-t border-border-divider px-8 py-5">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          loading={form.formState.isSubmitting}
        >
          Save Changes
        </Button>
      </div>
    </form>
    // </Dialog>
  );
}

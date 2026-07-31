"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/ui/Button";

import { epicSchema } from "../../schema/add-epic-schema";
import {
  EpicFormValues,
  EpicResponse,
  UpdateEpicRequest,
} from "../../types/Epic";

import { formatDate } from "../../lib/helper";
import { MemberAvatar } from "@/features/members/component/ui/MemberAvatar";
import Image from "next/image";
import { getMembers } from "@/features/members/api/getMember";
import SelectField from "./SelectField";
import { useEffect, useState } from "react";
import { MemberResponse } from "@/features/members/types/Member";
import { getMembersClient } from "../../api/epic-api";

type Props = {
  epic: EpicResponse;
  onEpicUpdate: (updatedEpic: Partial<UpdateEpicRequest>) => Promise<void>;
  onClose: () => void;
};

export default function EpicDetailsModal({
  epic,
  onClose,
  onEpicUpdate,
}: Props) {
  const [members, setMembers] = useState<MemberResponse[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);

  useEffect(() => {
    async function loadMembers() {
      try {
        setLoadingMembers(true);

        const res = await getMembersClient(epic.project_id);
        setMembers(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingMembers(false);
      }
    }

    loadMembers();
  }, [epic.project_id]);

  const form = useForm<EpicFormValues>({
    resolver: zodResolver(epicSchema),
    mode: "onChange",
    defaultValues: {
      title: epic.title,
      description: epic.description ?? "",
      assignee_id: epic.assignee?.sub ?? "",
      deadline: epic.deadline ?? "",
    },
  });
  const titleField = form.register("title");

  return (
    <div className="w-screen h-screen absolute inset-0 bg-[#F9F9FF30] backdrop-blur-sm flex justify-center items-center ">
      <form className="flex flex-col gap-8 bg-card-background p-8 w-full max-w-2xl shadow-md rounded-md">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Image
                src={"/assets/icons/epic-popup-icon.svg"}
                width={20}
                height={20}
                alt="epic icon"
              />
              <span className="text-xs font-semibold text-primary">
                {epic.epic_id}
              </span>
            </div>

            <button className="cursor-pointer " type="button" onClick={onClose}>
              <Image
                src={"/assets/icons/close.svg"}
                width={16}
                height={16}
                alt="close icon"
              />
            </button>
          </div>

          {/* Title */}
          <input
            {...titleField}
            onBlur={async (e) => {
              titleField.onBlur(e);
              const valid = await form.trigger("title");
              if (!valid) return;

              const title = form.getValues("title").trim();

              if (title === epic.title) return;

              await onEpicUpdate({ title });
            }}
            className="h-12 w-full rounded-lg border border-[#D7E2FF] px-4 text-xl font-semibold"
          />
          {form.formState.errors.title && (
            <p className="w-full rounded-sm bg-bg-error py-2.5 px-3 text-sm text-error">
              {form.formState.errors.title?.message as string}
            </p>
          )}
        </div>
        <div className="border-t border-border-divider" />
        {/* Description */}
        <textarea
          {...form.register("description")}
          onBlur={async (e) => {
            e.stopPropagation();
            const description = e.target.value.trim();
            if (description === epic.title) return;
            await onEpicUpdate({ description });
          }}
          rows={5}
          className="w-full rounded-lg border border-[#D7E2FF]  p-4 resize-none"
        />
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-text-muted">
              Created By
            </p>
            <div className="flex items-center gap-1">
              <MemberAvatar
                name={epic.created_by.name}
                className="text-sm !p-2 bg-bg-avatar"
              />
              <p className="font-medium">{epic.created_by.name}</p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase text-text-muted">
              Assignee
            </p>

            <SelectField
              label=""
              formData={form}
              name="assignee_id"
              placeholder="Unassigned"
              options={[
                {
                  label: "Unassigned",
                  value: "",
                },
                ...members.map((member) => ({
                  label: member.metadata.name,
                  value: member.user_id,
                })),
              ]}
              onChange={async (e) => {
                const assignee_id = e.target.value;

                if (
                  assignee_id === (epic.assignee?.sub ?? "") ||
                  assignee_id === ""
                )
                  return;

                form.setValue("assignee_id", assignee_id);

                await onEpicUpdate({
                  assignee_id: assignee_id,
                });
              }}
            />
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase text-text-muted">
              Deadline
            </p>

            <input
              type="date"
              {...form.register("deadline")}
              onBlur={async (e) => {
                e.stopPropagation();
                const deadline = e.target.value.trim();
                if (deadline === epic.deadline) return;
                await onEpicUpdate({ deadline });
              }}

              className="w-full rounded-lg border border-border-divider bg-background px-3 py-2 outline-none"
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-text-muted">
              Created At
            </p>

            <p>{formatDate(epic.created_at)}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border-divider" />

        {/* Tasks */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Tasks</h3>

            <Button type="button" variant="secondary">
              + Add Task
            </Button>
          </div>

          <div className="flex flex-col gap-4 p-10  items-center justify-center rounded-xl border border-dashed border-border-divider bg-[#F1F3FF]">
            <div className="rounded-md p-4 bg-[#D7E2FF] ">
              <Image
                src={"/assets/icons/add-task.svg"}
                width={20}
                height={20}
                alt="add task icon"
              />
            </div>
            <div className="text-center">
              <p className="text-base font-medium ">
                No tasks have been added to this epic yet
              </p>
            </div>
            <Button type="button" variant="primary">
              + Add Task
            </Button>
          </div>
        </section>
        {/* <div className="flex justify-end gap-3 border-t border-border-divider px-8 py-5">
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
        </div> */}
      </form>
    </div>
  );
}

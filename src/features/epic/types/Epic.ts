import z from "zod";
import { epicSchema } from "../schema/add-epic-schema";

export type EpicFormValues = z.infer<typeof epicSchema>;

export interface CreateEpicRequest {
  title: string;
  project_id: string;
  description?: string;
  assignee_id?: string;
  deadline?: string;
}

export interface UpdateEpicRequest {
  title?: string;
  description?: string;
  assignee_id?: string;
  deadline?: string;
}

export interface EpicUser {
  sub: string;
  name: string;
  email: string;
  department: string;
}

export interface EpicResponse {
  id: string;
  project_id: string;
  title: string;
  description: string;
  created_at: string;
  deadline: string | null;
  epic_id: string;

  created_by: EpicUser;
  assignee: EpicUser | null;
}

export type EpicsResponse = EpicResponse[];

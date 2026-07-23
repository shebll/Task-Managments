import z from "zod";
import { addProjectSchema } from "../schema/add-project-schema";

export type AddProjectType = z.infer<typeof addProjectSchema>;

export type ProjectsData = {
  id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
}[];

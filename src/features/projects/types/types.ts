import z from "zod";
import { addProjectSchema } from "../schema/add-project-schema";

export type AddProjectType = z.infer<typeof addProjectSchema>;

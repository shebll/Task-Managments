import { signUpSchema } from "@/schemas/sign-up-schema";
import z from "zod";
export type signUpType = z.infer<typeof signUpSchema>;

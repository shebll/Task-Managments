import { useMutation } from "@tanstack/react-query";
import { addProject } from "../api/projects-api";

export const useAddProject = () => {
  return useMutation({ mutationFn: addProject, mutationKey: ["projects"] });
};

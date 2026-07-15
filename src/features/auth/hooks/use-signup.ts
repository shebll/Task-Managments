import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/auth-api";

export function useSignup() {
  return useMutation({
    mutationFn: signup,
  });
}

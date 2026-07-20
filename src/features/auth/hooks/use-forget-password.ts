import { useMutation } from "@tanstack/react-query";
import { forgetPassword } from "../api/auth-api";

export function useForgetPassword() {
  return useMutation({
    mutationFn: forgetPassword,
  });
}

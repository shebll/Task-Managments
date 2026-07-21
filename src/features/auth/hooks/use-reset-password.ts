import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../api/auth-api";

export function useResetPassword() {
  return useMutation({
    mutationFn: ({
      data,
      accessToken,
    }: {
      data: { password: string };
      accessToken: string;
    }) => resetPassword(data, accessToken),
  });
}

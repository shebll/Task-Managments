import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { logout } from "../api/auth-api";
import { useRouter } from "next/navigation";

export function useLogout() {
  const auth = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await logout();

      auth.logout();
      router.replace("/login");
    },
  });
}

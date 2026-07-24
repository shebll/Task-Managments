"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const params = new URLSearchParams(hash.slice(1));

    // Handle recovery errors
    const error = params.get("error");

    if (error) {
      router.replace("/reset-password?invalid=true");
      return;
    }

    // Handle valid recovery
    if (params.get("type") !== "recovery") return;

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (!accessToken || !refreshToken) {
      router.replace("/reset-password?error=invalid_link");
      return;
    }

    // Store tokens in sessionStorage (cleared when tab closes)
    // More secure than URL query params which persist in browser history
    sessionStorage.setItem("recovery_access_token", accessToken);
    sessionStorage.setItem("recovery_refresh_token", refreshToken);

    router.replace("/reset-password");
  }, [router]);

  return <div className="heading1">Home page</div>;
}

import AuthHeader from "@/components/layout/AuthHeader";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <AuthHeader />
      <div className="pt-4 pb-12 flex justify-center">{children}</div>
    </main>
  );
}

export default AuthLayout;

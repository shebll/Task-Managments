import AuthHeader from "@/components/layout/AuthHeader";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl h-full m-auto pr-6 md:pr-10 pl-6 md:pl-10">
      <AuthHeader />
      <div className="pt-4 pb-12 flex justify-center">{children}</div>
    </div>
  );
}

export default AuthLayout;

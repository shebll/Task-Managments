import SectionTitle from "@/components/shared/SectionTitle";
import RestPasswordFrom from "@/features/auth/components/RestPasswordFrom";
import ErrorCard from "@/features/auth/components/ui/ErrorCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

async function page({
  searchParams,
}: {
  searchParams: Promise<{
    access_token?: string;
    refresh_token?: string;
    invalid?: boolean;
  }>;
}) {
  const { access_token, refresh_token, invalid } = await searchParams;
  if (invalid) {
    return (
      <ErrorCard
        title="Reset Link Expired"
        description="This password reset link is invalid or has expired. Please request a new one."
      />
    );
  }

  return (
    <div className="md:bg-bg-card md:p-12 rounded-md flex flex-col items-center w-full md:w-fit">
      <div>
        <div className="text-center">
          <SectionTitle
            title="Create a New Password"
            des={{
              desktop:
                "Create a new, strong password to secure your workstation access.",
              mobile:
                "Create a new, strong password to secure your workstation access.",
            }}
          />
        </div>

        {/* form component */}
        <RestPasswordFrom
          access_token={access_token}
          refresh_token={refresh_token}
        />
      </div>
    </div>
  );
}

export default page;

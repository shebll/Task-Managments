import SectionTitle from "@/components/shared/SectionTitle";
import ForgetPasswordForm from "@/features/auth/components/ForgetPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password",
};

function ForgetPassword() {
  return (
    <div className="md:bg-bg-card md:p-12 rounded-md flex flex-col items-center w-full md:w-fit">
      <div className="text-center md:text-start w-full">
        <SectionTitle
          title="Forgot password?"
          des={{
            desktop: "No worries, we'll send you reset instructions.",
            mobile: "No worries, we'll send you reset instructions.",
          }}
        />
      </div>

      {/* form component */}
      <ForgetPasswordForm />
    </div>
  );
}

export default ForgetPassword;

import SectionTitle from "@/components/shared/SectionTitle";
import LoginFrom from "@/features/auth/components/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LogIn",
};
function Login() {
  return (
    <div className="md:bg-bg-card md:p-12 rounded-md flex flex-col items-center w-full md:w-fit">
      <div className="text-center">
        <SectionTitle
          title="Welcome Back"
          des={{
            desktop: "Please enter your details to access your workspace",
            mobile: "Please enter your details to access your workspace",
          }}
        />
      </div>

      {/* form component */}
      <LoginFrom />
    </div>
  );
}

export default Login;

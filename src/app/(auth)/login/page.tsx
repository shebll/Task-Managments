"use client";
import SectionTitle from "@/components/shared/SectionTitle";
import LoginFrom from "@/features/auth/components/LoginForm";

function Login() {
  return (
    <div className="bg-card-background p-12 rounded-md flex flex-col  items-center">
      {/* section title component */}
      <SectionTitle
        title="Welcome Back"
        des="Please enter your details to access your workspace"
      />

      {/* form component */}
      <LoginFrom />

      {/* <FormComponent /> */}
    </div>
  );
}

export default Login;

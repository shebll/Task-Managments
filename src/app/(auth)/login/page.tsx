"use client";
import FormFooter from "@/features/auth/components/ui/FormFooter";
import SectionTitle from "@/components/shared/SectionTitle";

function Login() {
  return (
    <div className="bg-card-background p-12 rounded-md flex flex-col  items-center">
      {/* section title component */}
      <SectionTitle
        title="Welcome Back"
        des="Please enter your details to access your workspace"
      />

      {/* form component */}

      {/* <FormComponent /> */}
    </div>
  );
}

export default Login;

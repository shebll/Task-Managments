"use client";
import FormFooter from "@/components/forms/FormFooter";
import SectionTitle from "@/components/shared-ui/SectionTitle";
import Button from "@/components/ui/Button";

import { SubmitHandler, useForm } from "react-hook-form";
import { signUpType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/sign-up-schema";
import FormField from "@/components/forms/FormField";

function Login() {
  const formdata = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });

  const onSubmitHandler: SubmitHandler<signUpType> = (data: signUpType) => {
    console.log(data);
  };
  return (
    <div className="bg-card-background p-12 rounded-md flex flex-col  items-center">
      {/* section title component */}
      <SectionTitle
        title="Welcome Back"
        des="Please enter your details to access your workspace"
      />

      {/* form component */}
      <form
        onSubmit={formdata.handleSubmit(onSubmitHandler)}
        className="flex flex-col items-center gap-[24px] w-120"
      >
        <FormField
          formdata={formdata}
          name="name"
          type="string"
          label="name"
          minLength={3}
          maxLength={50}
          placeholder="Enter your full name"
          hint=" 3-50 characters, letters only."
        />
        <FormField
          formdata={formdata}
          label="Email"
          name="email"
          type="email"
          placeholder="yourname@company.com"
        />
      </form>

      <FormFooter
        text="Already have an account? "
        linkText="Log in"
        linkHref="/login"
      />
      {/* <FormComponent /> */}
    </div>
  );
}

export default Login;

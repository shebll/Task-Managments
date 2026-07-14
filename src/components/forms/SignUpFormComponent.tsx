"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import FormFooter from "@/components/forms/FormFooter";
import Button from "@/components/ui/Button";
import { signUpType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/sign-up-schema";
import FormField from "./FormField";
import InfoItem from "../ui/InfoItem";

function SignUpFormComponent() {
  const formdata = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });
  const password = formdata.watch("password");
  console.log(password);

  const onSubmitHandler: SubmitHandler<signUpType> = (data: signUpType) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={formdata.handleSubmit(onSubmitHandler)}
      className="flex flex-col items-center gap-[24px] max-w-120"
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
      <FormField
        formdata={formdata}
        label="Job Title (Optional)"
        name="jobTitle"
        type="text"
        placeholder="e.g. Project Manager"
      />
      <div className="flex gap-4">
        <FormField
          formdata={formdata}
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <FormField
          formdata={formdata}
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Repeat your password "
        />
      </div>
      <div className="w-full rounded-md bg-blue-100 p-[16px] flex flex-col gap-[8px]">
        <InfoItem
          text="At least 8 characters"
          completed={(password && password.length >= 8) || false}
        />

        <InfoItem
          text="One uppercase, lowercase, and digit"
          completed={/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password) || false}
        />

        <InfoItem
          text="One special character"
          completed={/[!@#$%^&*(),.?":{}|<>]/.test(password) || false}
        />
      </div>

      <Button variant="primary" className="w-full">
        Create Account
      </Button>
      <FormFooter
        text="Already have an account? "
        linkText="Log in"
        linkHref="/login"
      />
    </form>
  );
}

export default SignUpFormComponent;

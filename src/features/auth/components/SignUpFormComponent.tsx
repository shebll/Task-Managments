"use client";
import { signUpSchema } from "@/features/auth/schema/sign-up-schema";
import FormFooter from "@/features/auth/components/ui/FormFooter";
import { signUpType } from "@/features/auth/types/types";
import FormField from "./FormField";

import PasswordRequirements from "./PasswordRequirements";
import Button from "@/components/ui/Button";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
      {/* Form Fields */}
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

      {/* form Requirements List */}
      <PasswordRequirements password={password} />

      {/* Submit Button */}

      <Button variant="primary" className="w-full">
        Create Account
      </Button>

      {/* Form Footer */}
      <FormFooter
        text="Already have an account? "
        linkText="Log in"
        linkHref="/login"
      />
    </form>
  );
}

export default SignUpFormComponent;

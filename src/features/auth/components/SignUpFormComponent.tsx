"use client";
import { signUpSchema } from "@/features/auth/schema/sign-up-schema";
import FormFooter from "@/features/auth/components/ui/FormFooter";
import { signUpType } from "@/features/auth/types/types";
import FormField from "./FormField";

import PasswordRequirements from "./PasswordRequirements";
import Button from "@/components/ui/Button";

import { SubmitHandler, useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "../hooks/use-signup";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/use-auth";

function SignUpFormComponent() {
  const router = useRouter();
  const { login } = useAuth();
  const signupMutation = useSignup();

  const formdata = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });
  const password = useWatch({
    control: formdata.control,
    name: "password",
  });

  const onSubmitHandler: SubmitHandler<signUpType> = (
    payloadData: signUpType,
  ) => {
    const data = {
      email: payloadData.email,
      password: payloadData.password,
      data: {
        name: payloadData.name,
        department: payloadData.jobTitle || "",
      },
    };
    signupMutation.mutate(data, {
      onSuccess: (response) => {
        login(response.user, response.access_token, response.refresh_token);
        router.replace("/projects");
      },

      onError: (error) => {
        formdata.setError("root", { message: error.message });
      },
    });
  };
  return (
    <form
      onSubmit={formdata.handleSubmit(onSubmitHandler)}
      className="flex flex-col items-center gap-6 max-w-120"
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
      {formdata.formState.errors.root && (
        <p className="w-full rounded-sm bg-bg-error pb-3.5 pt-3.5 pr-4 pl-4 text-sm text-error">
          {formdata.formState.errors.root.message}
        </p>
      )}
      <Button
        loading={signupMutation.isPending}
        variant="primary"
        className="w-full"
      >
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

"use client";
import FormFooter from "@/features/auth/components/ui/FormFooter";
import { loginType } from "@/features/auth/types/types";
import FormField from "./FormField";

import Button from "@/components/ui/Button";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/login-schema";
import { useLogin } from "../hooks/use-login";
import { useAuth } from "../hooks/use-auth";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

function LoginFrom() {
  const router = useRouter();
  const { login } = useAuth();
  const loginMutation = useLogin();

  const formdata = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmitHandler: SubmitHandler<loginType> = (data: loginType) => {
    loginMutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          login(
            response.user,
            response.access_token,
            response.refresh_token,
            data.rememberMe,
          );
          router.replace("/projects");
        },

        onError: (error) => {
          formdata.setError("root", { message: error.message });
        },
      },
    );
  };
  return (
    <form
      onSubmit={formdata.handleSubmit(onSubmitHandler)}
      className="flex flex-col items-center gap-[24px] md:w-120 "
    >
      {/* Form Fields */}

      <FormField
        formdata={formdata}
        label="Email"
        name="email"
        type="email"
        placeholder="yourname@company.com"
      />
      <FormField
        formdata={formdata}
        label="Password"
        name="password"
        type="password"
        placeholder="Password"
      />
      <div className="flex items-center justify-between w-full">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={false}
            {...formdata.register("rememberMe")}
            className="size-5"
          />

          <span className="text-sm font-medium">Remember Me</span>
        </label>

        <a href="/forgot-password" className="text-primary font-semibold">
          Forgot Password?
        </a>
      </div>

      {/* Submit Button */}
      <Button
        loading={loginMutation.isPending}
        variant="primary"
        className="w-full"
      >
        <p>Log In</p>
        <ArrowRight size={24} />
      </Button>

      {formdata.formState.errors.root && (
        <p className="w-full rounded-[4px] bg-[#FFDAD6] pb-3.5 pt-3.5 pr-4 pl-4 text-sm text-error">
          {formdata.formState.errors.root.message}
        </p>
      )}

      {/* Form Footer */}
      <FormFooter
        text="Don't have an account? "
        linkText="Sign Up"
        linkHref="/sign-up"
      />
    </form>
  );
}

export default LoginFrom;

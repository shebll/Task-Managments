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

import { useMediaQuery } from "usehooks-ts";

function LoginFrom() {
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });
  const router = useRouter();
  const { login } = useAuth();
  const loginMutation = useLogin();

  const formdata = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
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
          router.replace("/project");
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
      className="flex flex-col items-center gap-6 w-full md:w-120  "
    >
      {/* Form Fields */}

      <FormField
        formdata={formdata}
        label={isDesktop ? "Email" : "Email Address"}
        name="email"
        type="email"
        placeholder={
          isDesktop ? "yourname@company.com" : "curator@workspace.com"
        }
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

            {...formdata.register("rememberMe")}
            className="size-4 rounded border border-border-checkbox accent-accent-checkbox cursor-pointer"
          />

          <span className="text-sm font-medium text-text-secondary">
            Remember Me
          </span>
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
        <p className="w-full rounded-sm bg-bg-error pb-3.5 pt-3.5 pr-4 pl-4 text-sm text-error">
          {formdata.formState.errors.root.message}
        </p>
      )}

      <div className="w-full border-t mt-6 border-border-divider flex justify-center">
        {/* Form Footer */}
        <FormFooter
          text="Don't have an account? "
          linkText="Sign Up"
          linkHref="/sign-up"
        />
      </div>
    </form>
  );
}

export default LoginFrom;

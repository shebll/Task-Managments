"use client";

import FormField from "./FormField";

import { SubmitHandler, useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useResetPassword } from "../hooks/use-reset-password";
import { resetPasswordSchema } from "../schema/restPasswordSchema";
import { useState } from "react";
import NewPasswordRequirements from "./NewPasswordRequirements";
import { resetPasswordType } from "../types/types";
import Button from "@/components/ui/Button";
import FormFooter from "./ui/FormFooter";

function RestPasswordFrom() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const resetPasswordMutation = useResetPassword();

  // Read tokens from sessionStorage synchronously during initialization.
  // sessionStorage is synchronous and browser-only, so this avoids
  // useEffect + cascading setState calls (avoids React anti-pattern).
  const [accessToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const token = sessionStorage.getItem("recovery_access_token");
    if (token) {
      // Clean up sessionStorage immediately after reading
      sessionStorage.removeItem("recovery_access_token");
      sessionStorage.removeItem("recovery_refresh_token");
    }
    return token;
  });

  // Derived state — no additional useState needed
  const hasTokenError = !accessToken;

  const formdata = useForm<resetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });
  const password = useWatch({
    control: formdata.control,
    name: "password",
  });

  const onSubmitHandler: SubmitHandler<resetPasswordType> = (
    data: resetPasswordType,
  ) => {
    if (!accessToken) return;

    resetPasswordMutation.mutate(
      { data: { password: data.password }, accessToken },
      {
        onSuccess: () => {
          setIsSuccess(true);

          setTimeout(() => {
            router.replace("/login");
          }, 3000);
        },

        onError: (error) => {
          formdata.setError("root", { message: error.message });
        },
      },
    );
  };

  if (hasTokenError) {
    return (
      <div className="w-full max-w-120 rounded-sm bg-bg-error p-4 text-sm text-error text-center">
        Invalid or missing reset link. Please request a new password reset.
      </div>
    );
  }

  return (
    <form
      onSubmit={formdata.handleSubmit(onSubmitHandler)}
      className="flex flex-col items-center gap-6 max-w-120 w-full"
    >
      {/* Form Fields */}

      <FormField
        formdata={formdata}
        label="Password"
        name="password"
        type="password"
        placeholder={"Password"}
      />
      <FormField
        formdata={formdata}
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Repeat your password "
      />

      {/* form Requirements List */}
      <NewPasswordRequirements password={password} />

      {/* Submit Button */}
      {formdata.formState.errors.root && (
        <p className="w-full rounded-sm bg-bg-error pb-3.5 pt-3.5 pr-4 pl-4 text-sm text-error">
          {formdata.formState.errors.root.message}
        </p>
      )}
      <Button
        loading={resetPasswordMutation.isPending}
        variant="primary"
        className="w-full"
      >
        Update Password
      </Button>
      {isSuccess && (
        <p className="w-full rounded-sm bg-status-success-bg p-4 text-sm text-text-success ">
          Your password has been updated successfully. <br /> You can now log in
        </p>
      )}

      {/* Form Footer */}
      <FormFooter
        text="Back to sign in  "
        linkText="Log in"
        linkHref="/login"
      />
    </form>
  );
}

export default RestPasswordFrom;

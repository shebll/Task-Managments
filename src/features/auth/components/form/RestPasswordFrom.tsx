"use client";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPasswordSchema } from "../../schema/restPasswordSchema";
import { resetPasswordType } from "../../types/types";

import NewPasswordRequirements from "../NewPasswordRequirements";
import Button from "@/components/ui/Button";
import FormFooter from "../ui/FormFooter";
import FormField from "../FormField";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { resetPassword } from "../../api/auth-api";

function RestPasswordFrom() {
  const router = useRouter();

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

  const hasTokenError = !accessToken;

  const formData = useForm<resetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });
  const password = useWatch({
    control: formData.control,
    name: "password",
  });

  const onSubmitHandler: SubmitHandler<resetPasswordType> = async (
    data: resetPasswordType,
  ) => {
    if (!accessToken) return;
    try {
      await resetPassword(data, accessToken);
      setTimeout(() => {
        router.replace("/login");
      }, 3000);
    } catch (error) {
      console.log(error instanceof Error);
      if (error instanceof Error) {
        formData.setError("root", { message: error.message });
      } else {
        formData.setError("root", { message: "Something Went Wrong !" });
      }
    }
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
      onSubmit={formData.handleSubmit(onSubmitHandler)}
      className="flex flex-col items-center gap-6 max-w-120 w-full"
    >
      {/* Form Fields */}

      <FormField
        formData={formData}
        label="Password"
        name="password"
        type="password"
        placeholder={"Password"}
      />
      <FormField
        formData={formData}
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Repeat your password "
      />

      {/* form Requirements List */}
      <NewPasswordRequirements password={password} />

      {/* Submit Button */}
      {formData.formState.errors.root && (
        <p className="w-full rounded-sm bg-bg-error pb-3.5 pt-3.5 pr-4 pl-4 text-sm text-error">
          {formData.formState.errors.root.message}
        </p>
      )}
      <Button
        loading={formData.formState.isSubmitting}
        variant="primary"
        className="w-full"
      >
        Update Password
      </Button>
      {formData.formState.isSubmitSuccessful && (
        <p className="w-full rounded-sm bg-status-success-bg p-4 text-sm text-text-success text-center">
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

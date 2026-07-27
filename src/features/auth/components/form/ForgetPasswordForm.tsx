"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { forgetPasswordType } from "../../types/types";
import { forgetPasswordSchema } from "../../schema/reset-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../FormField";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SuccessSection from "../ui/SuccessSection";
import { forgetPassword } from "../../api/auth-api";

function ForgetPasswordForm() {
  // helper for get data from local

  // state for showing timer and resend button and limit and errors default false
  const [isEmailSent, setIsEmailSent] = useState(false);

  // state for time and reSend count
  const [timeLeft, setTimeLeft] = useState(0);
  const [resendCount, setResendCount] = useState(0);

  // form hook with zod validation
  const formData = useForm<forgetPasswordType>({
    resolver: zodResolver(forgetPasswordSchema),
    mode: "onChange",
  });

  // forget password api call

  // boolean value for can send and resend
  const canResend =
    timeLeft === 0 && resendCount < 3 && !formData.formState.isSubmitting;

  // timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleForgetPassword: SubmitHandler<forgetPasswordType> = async (
    data: forgetPasswordType,
  ) => {
    try {
      await forgetPassword(data);
      const nextCount = resendCount + 1;
      setResendCount(nextCount);
      setTimeLeft(20);
      setIsEmailSent(true);
    } catch (error) {
      console.log(error instanceof Error);
      if (error instanceof Error) {
        formData.setError("root", { message: error.message });
      } else {
        formData.setError("root", { message: "Something Went Wrong !" });
      }
    }
  };
  return (
    <form
      onSubmit={formData.handleSubmit(handleForgetPassword)}
      className="flex flex-col gap-6 w-full md:w-md"
    >
      <FormField
        formData={formData}
        type="email"
        name="email"
        label="Email address"
        placeholder="Enter your email"
      />
      <Button
        disabled={!canResend}
        loading={formData.formState.isSubmitting}
        variant="primary"
        className="w-full"
      >
        <p>Send Reset Link</p>
      </Button>
      {formData.formState.errors.root && (
        <p className="w-full rounded-sm bg-bg-error pb-3.5 pt-3.5 pr-4 pl-4 text-sm text-error">
          {formData.formState.errors.root.message}
        </p>
      )}
      <Link href="/login">
        <Button variant="secondary" className="w-full">
          <ArrowLeft size={16} className="text-primary" />
          <p>Back to log in</p>
        </Button>
      </Link>
      {/* success email send */}
      {isEmailSent && (
        <SuccessSection
          canResend={canResend}
          resendCount={resendCount}
          timeLeft={timeLeft}
          isPending={formData.formState.isSubmitting}
          onResend={formData.handleSubmit(handleForgetPassword)}
        />
      )}
    </form>
  );
}

export default ForgetPasswordForm;

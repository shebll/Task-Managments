"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { forgetPasswordType } from "../types/types";
import { forgetPasswordSchema } from "../schema/reset-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "./FormField";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForgetPassword } from "../hooks/use-forget-password";
import { forgetPasswordStorage } from "../lib/forgetPasswordStorage";
import SuccessSection from "./ui/SuccessSection";

function ForgetPasswordForm() {
  // helper for get data from local
  const { setForgetPasswordData, getForgetPasswordData } =
    forgetPasswordStorage;

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
  const forgetPasswordMutation = useForgetPassword();

  // boolean value for can send and resend
  const canResend =
    timeLeft === 0 && resendCount < 3 && !forgetPasswordMutation.isPending;

  // formate time left
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  // Effect for getting forget password form local (helper)
  useEffect(() => {
    const data = getForgetPasswordData();
    if (!data) return;
    formData.setValue("email", data.email);
    setResendCount(data.resendCount);
    setIsEmailSent(true);
    // if expireAt in past it will return -32 and get the bigger the zero
    const remaining = Math.max(
      0,
      Math.floor((data.expireAt - Date.now()) / 1000) /* convert in seconds */,
    );
    setTimeLeft(remaining);
  }, []);

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

  const handleForgetPassword: SubmitHandler<forgetPasswordType> = (
    data: forgetPasswordType,
  ) => {
    forgetPasswordMutation.mutate(data, {
      onSuccess: () => {
        const nextCount = resendCount + 1;
        const expireAt = Date.now() + 5 * 60 * 1000;

        setResendCount(nextCount);
        setTimeLeft(300);
        setIsEmailSent(true);

        setForgetPasswordData({
          email: data.email,
          resendCount: nextCount,
          expireAt,
        });
      },
      onError: (error) => {
        formData.setError("root", {
          message: error.message ? error.message : "network error",
        });
      },
    });
  };
  return (
    <form
      onSubmit={formData.handleSubmit(handleForgetPassword)}
      className="flex flex-col gap-6 w-full md:w-md"
    >
      <FormField
        formdata={formData}
        type="email"
        name="email"
        label="Email address"
        placeholder="Enter your email"
      />
      <Button
        disabled={!canResend}
        loading={forgetPasswordMutation.isPending}
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
          minutes={minutes}
          seconds={seconds}
          isPending={forgetPasswordMutation.isPending}
          onResend={formData.handleSubmit(handleForgetPassword)}
        />
      )}
    </form>
  );
}

export default ForgetPasswordForm;

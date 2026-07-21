import { AlertCircle } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

type ErrorCardProps = {
  title?: string;
  description?: string;
};

export default function ErrorCard({
  title = "Invalid or Expired Link",
  description = "This password reset link is invalid or has expired. Please request a new password reset email.",
}: ErrorCardProps) {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-lg border border-border bg-card p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bg-error text-error">
        <AlertCircle size={32} />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{title}</h2>

        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Link href="/forgot-password" className="w-full">
        <Button variant="primary" className="w-full">
          Request New Reset Link
        </Button>
      </Link>

      <Link href="/login" className="w-full">
        <Button variant="secondary" className="w-full">
          Back to Login
        </Button>
      </Link>
    </div>
  );
}

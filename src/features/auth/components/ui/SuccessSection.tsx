import Button from "@/components/ui/Button";
import { CheckCircle2, Timer } from "lucide-react";

type Props = {
  canResend: boolean;
  isPending: boolean;
  minutes: string;
  seconds: string;
  resendCount: number;
  onResend: () => void;
};

function SuccessSection({
  canResend,
  isPending,
  minutes,
  seconds,
  resendCount,
  onResend,
}: Props) {
  return (
    <div className="flex gap-6 flex-col justify-center items-center">
      <div className="p-4 rounded-md bg-status-success-bg/33 text-text-success flex gap-3">
        <CheckCircle2 size={24} />
        <p>
          If an account exists with this email, we’ve sent a password reset
          link.
        </p>
      </div>
      <p className=" text-xs uppercase font-bold ">
        Did not receive the email?
      </p>
      <Button
        disabled={!canResend}
        type="button"
        variant="secondary"
        onClick={() => onResend}
        loading={isPending}
        className="w-full flex rounded-sm p-3 bg-blue-50 justify-center items-center gap-2 text-muted-foreground font-semibold "
      >
        <Timer />
        <p>
          {canResend
            ? `Resend (${3 - resendCount} left)`
            : `Resend in ${minutes}:${seconds}`}
        </p>
      </Button>
      {resendCount >= 3 && (
        <p className="text-sm text-error text-center">
          You have reached the maximum number of resend attempts.
        </p>
      )}
    </div>
  );
}

export default SuccessSection;

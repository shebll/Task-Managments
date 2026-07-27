import RequirementItem from "./ui/RequirementItem";

type Props = { password: string };

function LoginPasswordRequirements({ password }: Props) {
  return (
    <div className="hidden w-full rounded-md bg-bg-input p-4 md:flex flex-col gap-2">
      <RequirementItem
        text="At least 8 characters"
        completed={(password && password.length >= 8) || false}
      />

      <RequirementItem
        text="One uppercase, lowercase, and digit"
        completed={/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password) || false}
      />

      <RequirementItem
        text="One special character"
        completed={/[!@#$%^&*(),.?":{}|<>]/.test(password) || false}
      />
    </div>
  );
}

export default LoginPasswordRequirements;

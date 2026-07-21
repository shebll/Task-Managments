import React from "react";
import RequirementItem from "./ui/RequirementItem";

type Props = { password: string };

function NewPasswordRequirements({ password }: Props) {
  return (
    <div className="w-full rounded-md bg-bg-input p-6 md:flex flex-col gap-4 ">
      <p className=" font-bold text-xs uppercase text-text-secondary  pb-2 border-b border-b-border-divider">
        Security Requirements
      </p>
      <div className="flex flex-col md:flex-row w-full justify-between items-start gap-3 text-primary">
        <div className="flex-1 flex flex-col gap-3">
          <RequirementItem
            text="8-64 characters"
            completed={(password && password.length >= 8) || false}
          />
          <RequirementItem
            text="Lowercase letter"
            completed={/(?=.*[a-z])/.test(password) || false}
          />
          <RequirementItem
            text="One special character"
            completed={/[!@#$%^&*(),.?":{}|<>]/.test(password) || false}
          />
        </div>
        <div className="flex-1 flex flex-col gap-3">
          <RequirementItem
            text="Uppercase letter"
            completed={/(?=.*[A-Z])/.test(password) || false}
          />
          <RequirementItem
            text="One digit"
            completed={/(?=.*\d)/.test(password) || false}
          />
        </div>
      </div>
    </div>
  );
}

export default NewPasswordRequirements;

import { InputHTMLAttributes } from "react";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import PasswordInput from "@/components/ui/PasswordInput";
import Input from "@/components/ui/Input";

type Props<T extends FieldValues> = {
  formData: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function FormField<T extends FieldValues>({
  formData,
  label,
  name,
  type,
  hint,
  placeholder,
}: Props<T>) {
  const error = formData.formState.errors[name];

  const InputComponent = name == "password" ? PasswordInput : Input;

  return (
    <div className="flex flex-col items-start w-full gap-6">
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor={name}
          className="uppercase text-xs text-text-muted font-bold pl-1"
        >
          {label}
        </label>
        <div className="relative w-full">
          <InputComponent
            error={error ? true : false}
            aria-placeholder={placeholder}
            type={type}
            id={name}
            placeholder={placeholder}
            {...formData.register(name)}
          />
        </div>

        {hint && (
          <p className="text-xs text-text-hint font-normal pl-1">{hint}</p>
        )}
        {error && (
          <p className="w-full rounded-sm bg-bg-error py-2.5 px-3 text-sm text-error">
            {error?.message as string}
          </p>
        )}
      </div>
    </div>
  );
}

export default FormField;

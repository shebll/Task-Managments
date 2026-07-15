import { InputHTMLAttributes } from "react";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import PasswordInput from "@/components/ui/PasswordInput";
import Input from "@/components/ui/Input";

type Props<T extends FieldValues> = {
  formdata: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function FormField<T extends FieldValues>({
  formdata,
  label,
  name,
  type,
  hint,
  placeholder,
}: Props<T>) {
  const error = formdata.formState.errors[name];

  const InputComponent = name == "password" ? PasswordInput : Input;

  return (
    <div className="flex flex-col items-start w-full  gap-[24px]">
      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor={name}
          className="uppercase text-xs text-muted-foreground font-bold pl-[4px]"
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
            {...formdata.register(name)}
          />
        </div>

        {hint && (
          <p className="text-xs text-[#C3C6D6] font-normal pl-[4px]">{hint}</p>
        )}
        {error && (
          <p className="w-full rounded-[4px] bg-[#FFDAD6] pb-3.5 pt-3.5 pr-4 pl-4 text-sm text-error">
            {error?.message as string}
          </p>
        )}
      </div>
    </div>
  );
}

export default FormField;

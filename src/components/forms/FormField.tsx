import { signUpType } from "@/types/types";
import { InputHTMLAttributes, useState } from "react";
import { Path, UseFormReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  formdata: UseFormReturn<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    jobTitle?: string | undefined;
  }>;
  label: string;
  name: Path<signUpType>;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function FormField({ formdata, label, name, type, hint, placeholder }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const error = formdata.formState.errors[name];
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
          <input
            aria-placeholder={placeholder}
            type={
              name == "password" ? (showPassword ? "text" : "password") : type
            }
            id={name}
            placeholder={placeholder}
            {...formdata.register(name)}
            className={`w-full rounded-[4px] bg-blue-100 py-3.5 px-4 text-[16px] leading-0
        placeholder:text-[#737685] focus-visible:outline-0 border-2
        ${
          error
            ? "border-error focus:border-error"
            : "border-transparent focus:border-primary"
        }`}
          />
          {name == "password" && (
            <button
              className="w-fit cursor-pointer absolute right-4 bottom-0.5  -translate-y-1/2"
              type="button"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                <EyeOff size={24} color="#737685" />
              ) : (
                <Eye size={24} color="#737685" />
              )}
            </button>
          )}
        </div>

        {hint && (
          <p className="text-xs text-[#C3C6D6] font-normal pl-[4px]">{hint}</p>
        )}
        {error && (
          <p className="w-full rounded-[4px] bg-[#FFDAD6] pb-3.5 pt-3.5 pr-4 pl-4 text-sm text-error">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default FormField;

import { SelectHTMLAttributes } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type Props<T extends FieldValues> = {
  formData: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  hint?: string;
  options: Option[];
  placeholder?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "name">;

function SelectField<T extends FieldValues>({
  formData,
  name,
  label,
  hint,
  options,
  placeholder = "Select an option",
  ...props
}: Props<T>) {
  const error = formData.formState.errors[name];

  return (
    <div className="flex flex-col items-start w-full gap-6">
      <div className="flex flex-col gap-2 w-full ">
        <label
          htmlFor={name}
          className="uppercase text-xs text-text-muted font-bold pl-1"
        >
          {label}
        </label>

        <select
          id={name}
          className={`w-full rounded-md md:rounded-sm
        bg-bg-input
        py-3.5 px-4
        text-base
        border-2
        placeholder:text-text-placeholder
        focus-visible:outline-0 transition-colors ${
          error ? "border-error" : "border-border-divider focus:border-primary"
        }`}
          defaultValue=""
          {...formData.register(name)}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {hint && (
          <p className="text-xs text-text-hint font-normal pl-1">{hint}</p>
        )}

        {error && (
          <p className="w-full rounded-sm bg-bg-error py-2.5 px-3 text-sm text-error">
            {error.message as string}
          </p>
        )}
      </div>
    </div>
  );
}

export default SelectField;

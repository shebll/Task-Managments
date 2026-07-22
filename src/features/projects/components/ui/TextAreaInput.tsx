import clsx from "clsx";
import React from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

function TextAreaInput({
  formData,
}: {
  formData: UseFormReturn<{
    name: string;
    description?: string | undefined;
  }>;
}) {
  const description = useWatch({
    control: formData.control,
    name: "description",
  });
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between">
        <label
          htmlFor="description"
          className="uppercase text-xs text-text-muted font-bold pl-1"
        >
          Description
        </label>
        <p className="hidden md:block text-xs text-text-muted/60">Optional</p>
      </div>
      <textarea
        {...formData.register("description")}
        name="description"
        id="description"
        placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
        maxLength={500}
        className={clsx(
          `
                    w-full rounded-md md:rounded-sm
                    bg-bg-input
                    py-3.5 px-4
                    text-base
                    border-2
                    placeholder:text-text-placeholder
                    focus-visible:outline-0
                    max-h-80
                    min-h-40
                    `,
          formData.formState.errors.description
            ? "border-error focus:border-error"
            : "border-transparent focus:border-primary",
        )}
      />
      <div className="w-full text-end">
        <p className="text-xs text-text-muted">
          {description ? description.length : 0} / 500 characters
        </p>
      </div>
      {formData.formState.errors.description && (
        <p className="w-full rounded-sm bg-bg-error pb-3.5 pt-3.5 pr-4 pl-4 text-sm text-error">
          {formData.formState.errors.description?.message as string}
        </p>
      )}
    </div>
  );
}

export default TextAreaInput;

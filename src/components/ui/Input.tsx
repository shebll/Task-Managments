import { InputHTMLAttributes } from "react";
import clsx from "clsx";

type Props = {
  error?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

function Input({ error, className, ...props }: Props) {
  return (
    <input
      {...props}
      className={clsx(
        `
        w-full rounded-md md:rounded-sm
        bg-bg-input
        py-3.5 px-4
        text-base
        border-2
        placeholder:text-text-placeholder
        focus-visible:outline-0
        `,
        error
          ? "border-error focus:border-error"
          : "border-transparent focus:border-primary",
        className,
      )}
    />
  );
}

export default Input;

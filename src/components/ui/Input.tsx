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
        w-full rounded-[4px]
        bg-blue-100
        py-3.5 px-4
        text-[16px]
        border-2
        placeholder:text-[#737685]
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

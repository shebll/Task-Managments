import React, { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Loader } from "lucide-react";
type Props = {
  children: ReactNode;
  loading?: boolean;
  variant: "primary" | "secondary" | "ghost";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ loading, children, variant, className, ...props }: Props) {
  const variants = {
    primary: "btn-prime",
    secondary: "text-primary text-[14px] py-3 px-4",
    ghost: "text-[#4F5F7B] text-[14px] py-3 px-4 ",
  };

  return (
    <button
      disabled={loading}
      {...props}
      className={clsx(
        "flex items-center justify-center gap-2",
        loading ? "cursor-not-allowed opacity-70" : "cursor-pointer",

        className,
        variants[variant],
      )}
    >
      {loading ? <Loader className="size-6 animate-spin" /> : children}
    </button>
  );
}

export default Button;

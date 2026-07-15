import React, { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
type Props = {
  children: ReactNode;
  loading: boolean;
  variant: "primary" | "secondary" | "ghost";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ loading, children, variant, className, ...props }: Props) {
  console.log(loading);
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
        loading ? "cursor-not-allowed" : "cursor-pointer",

        className,
        variants[variant],
      )}
    >
      {children}
    </button>
  );
}

export default Button;

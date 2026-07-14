import React, { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
type Props = {
  children: ReactNode;
  variant: "primary" | "secondary" | "ghost";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, variant, className, ...props }: Props) {
  const variants = {
    primary: "btn-prime",
    secondary: "text-primary text-[14px] py-3 px-4",
    ghost: "text-[#4F5F7B] text-[14px] py-3 px-4 ",
  };

  return (
    <button {...props} className={clsx(" ", className, variants[variant])}>
      {children}
    </button>
  );
}

export default Button;

"use client";

import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";
import Input from "./Input";

type Props = {
  error?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

function PasswordInput({ error, ...props }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input error={error} {...props} type={show ? "text" : "password"} />

      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="
        absolute right-4 top-1/2
        -translate-y-1/2
        "
      >
        {show ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
}

export default PasswordInput;

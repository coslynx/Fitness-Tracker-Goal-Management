"use client";

import { useState } from "react";
import { InputProps } from "@/types";
import { cn } from "@/lib/utils";

const Input = ({
  type = "text",
  placeholder = "",
  label = "",
  disabled = false,
  className,
  ...props
}: InputProps) => {
  const [value, setValue] = useState("");

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {label && (
        <label htmlFor={label} className="text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        className={cn(
          "border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500",
          disabled && "cursor-not-allowed opacity-50"
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
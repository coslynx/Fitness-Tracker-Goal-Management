"use client";

import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types";

const Button = ({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const buttonClasses = cn(
    "rounded-md px-4 py-2 font-medium text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
    {
      "bg-blue-500 text-white hover:bg-blue-700": variant === "primary",
      "bg-gray-200 text-gray-700 hover:bg-gray-300": variant === "secondary",
      "bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-100":
        variant === "outline",
    },
    className
  );

  return (
    <button type="button" className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
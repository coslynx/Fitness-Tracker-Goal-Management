"use client";

import { cn } from "@/lib/utils";
import { CardProps } from "@/types";

const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg shadow-md bg-white p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
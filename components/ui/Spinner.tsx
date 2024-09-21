"use client";

import { useState, useEffect } from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "gray" | "blue" | "green" | "red" | "yellow";
}

const Spinner = ({ size = "md", color = "gray" }: SpinnerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const sizeClass =
    size === "sm"
      ? "w-4 h-4"
      : size === "md"
      ? "w-6 h-6"
      : size === "lg"
      ? "w-8 h-8"
      : size === "xl"
      ? "w-10 h-10"
      : "w-6 h-6";

  const colorClass =
    color === "gray"
      ? "text-gray-400"
      : color === "blue"
      ? "text-blue-500"
      : color === "green"
      ? "text-green-500"
      : color === "red"
      ? "text-red-500"
      : color === "yellow"
      ? "text-yellow-500"
      : "text-gray-400";

  return (
    <div
      className={`animate-spin rounded-full ${sizeClass} ${colorClass}`}
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    />
  );
};

export default Spinner;
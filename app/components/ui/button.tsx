import { cn } from "../../utils/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "md",
  className,
  ...props
}) => {
  const base =
    "rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1";
  const variants: Record<string, string> = {
    default: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-300 hover:bg-gray-100",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };
  const sizes: Record<string, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

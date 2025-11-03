import React from "react";
import { cn } from "../../utils/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <input
    className={cn(
      "border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black",
      className
    )}
    {...props}
  />
);

import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "medium", 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:from-indigo-600 hover:to-purple-600 focus:ring-primary shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white focus:ring-secondary",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
    danger: "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 focus:ring-red-500 shadow-lg hover:shadow-xl"
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm rounded-md",
    medium: "px-4 py-2 text-base rounded-lg",
    large: "px-6 py-3 text-lg rounded-lg"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
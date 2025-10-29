import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    "under-review": "bg-gray-100 text-gray-800",
    planned: "bg-blue-100 text-info",
    "in-progress": "bg-yellow-100 text-warning",
    completed: "bg-green-100 text-success",
    rejected: "bg-red-100 text-error"
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;
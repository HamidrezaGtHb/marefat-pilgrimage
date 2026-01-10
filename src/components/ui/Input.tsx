import React from "react";
import { BaseComponentProps, SizeVariant } from "@/design-system/types";

export interface InputProps
  extends BaseComponentProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: SizeVariant;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = "md",
      fullWidth = true,
      className = "",
      id,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const sizeStyles: Record<SizeVariant, string> = {
      xs: "px-2.5 py-1.5 text-xs",
      sm: "px-3 py-2 text-xs",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-3 text-base",
      xl: "px-5 py-4 text-lg",
    };

    const baseStyles =
      "w-full rounded-xl border bg-ivory text-charcoal placeholder:text-charcoal/40 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ivory";

    const borderColor = error
      ? "border-red-400 focus:border-red-500 focus:ring-red/20"
      : "border-charcoal/10 focus:border-gold focus:ring-gold/20";

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-xs font-medium text-charcoal/75"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${baseStyles} ${sizeStyles[size]} ${borderColor} ${className}`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error || helperText
              ? `${inputId}-${error ? "error" : "helper"}`
              : undefined
          }
          required={required}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-xs text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-xs text-charcoal/60">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

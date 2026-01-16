import React from "react";
import { BaseComponentProps, SizeVariant } from "@/design-system/types";

export interface InputProps
  extends BaseComponentProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  suggestion?: string;
  onSuggestionClick?: () => void;
  size?: SizeVariant;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      suggestion,
      onSuggestionClick,
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
      md: "px-3 py-2.5 text-sm",
      lg: "px-4 py-3 text-base",
      xl: "px-5 py-4 text-lg",
    };

    const baseStyles =
      "w-full rounded-xl border bg-ivory text-charcoal placeholder:text-charcoal/40 transition focus:outline-none focus:ring-2";

    const borderColor = error
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : "border-charcoal/10 focus:border-gold focus:ring-gold/20";

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-xs font-medium text-charcoal"
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
            error || helperText || suggestion
              ? `${inputId}-${error ? "error" : suggestion ? "suggestion" : "helper"}`
              : undefined
          }
          required={required}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-xs text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
        {suggestion && !error && onSuggestionClick && (
          <button
            type="button"
            id={`${inputId}-suggestion`}
            onClick={onSuggestionClick}
            className="mt-1.5 text-xs text-gold-dark hover:underline"
          >
            Did you mean {suggestion}?
          </button>
        )}
        {helperText && !error && !suggestion && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-xs text-charcoal/60">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

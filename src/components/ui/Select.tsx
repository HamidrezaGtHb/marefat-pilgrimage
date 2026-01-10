import React from "react";
import { BaseComponentProps, SizeVariant } from "@/design-system/types";

export interface SelectProps
  extends BaseComponentProps,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: SizeVariant;
  fullWidth?: boolean;
  options: Array<{ value: string; label: string } | string>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
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
      options,
      ...props
    },
    ref
  ) => {
    const inputId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const sizeStyles: Record<SizeVariant, string> = {
      xs: "px-2.5 py-1.5 text-xs",
      sm: "px-3 py-2 text-xs",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-3 text-base",
      xl: "px-5 py-4 text-lg",
    };

    const baseStyles =
      "w-full rounded-xl border bg-ivory text-charcoal transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-ivory cursor-pointer";

    const borderColor = error
      ? "border-red-400 focus:border-red-500 focus:ring-red/20"
      : "border-charcoal/10 focus:border-gold focus:ring-gold/20";

    const normalizedOptions = options.map((option) =>
      typeof option === "string" ? { value: option, label: option } : option
    );

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
        <select
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
        >
          {normalizedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

Select.displayName = "Select";

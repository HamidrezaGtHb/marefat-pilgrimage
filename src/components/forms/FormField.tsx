import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import {
  validateEmail,
  validatePhone,
  validatePassportNumber,
  validatePassportExpiry,
  validateRequired,
  validateDate,
  ValidationResult
} from "@/utils/validation";

export type FieldType = "text" | "email" | "tel" | "date" | "passport" | "passportExpiry";

export interface FormFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  fieldType?: FieldType;
  error?: string;
  helperText?: string;
  onValidate?: (value: string) => ValidationResult;
  travelDate?: Date;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * Smart form field with built-in validation
 * Automatically handles different field types with appropriate validation
 */
export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      fieldType = "text",
      error: externalError,
      helperText,
      onValidate,
      travelDate,
      value,
      onChange,
      onBlur,
      required,
      ...props
    },
    ref
  ) => {
    const [internalError, setInternalError] = useState<string | undefined>();
    const [suggestion, setSuggestion] = useState<string | undefined>();

    // Use external error if provided, otherwise use internal
    const displayError = externalError || internalError;

    const handleValidation = (inputValue: string) => {
      let result: ValidationResult = { isValid: true };

      // Use custom validator if provided
      if (onValidate) {
        result = onValidate(inputValue);
      } else {
        // Default validation based on field type
        switch (fieldType) {
          case "email":
            result = validateEmail(inputValue);
            break;
          case "tel":
            result = validatePhone(inputValue);
            break;
          case "passport":
            result = validatePassportNumber(inputValue);
            break;
          case "passportExpiry":
            result = validatePassportExpiry(inputValue, travelDate);
            break;
          case "date":
            result = validateDate(inputValue, label);
            break;
          case "text":
            if (required && inputValue) {
              result = validateRequired(inputValue, label);
            }
            break;
        }
      }

      setInternalError(result.error);
      setSuggestion(result.suggestion);

      return result;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (value) {
        handleValidation(e.target.value);
      }
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      // Auto-format based on field type
      if (fieldType === "passport") {
        newValue = newValue.toUpperCase();
      }

      // Clear errors when user starts typing
      if (internalError) {
        setInternalError(undefined);
      }
      if (suggestion) {
        setSuggestion(undefined);
      }

      onChange?.(e);
    };

    const handleSuggestionClick = () => {
      if (suggestion && onChange) {
        const syntheticEvent = {
          target: { value: suggestion },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
        setSuggestion(undefined);
      }
    };

    // Set input type and inputMode based on field type
    const getInputProps = () => {
      switch (fieldType) {
        case "email":
          return { type: "email" as const };
        case "tel":
          return { type: "tel" as const, inputMode: "tel" as const };
        case "date":
        case "passportExpiry":
          return { type: "date" as const };
        case "passport":
          return {
            type: "text" as const,
            maxLength: 9,
            className: "font-mono"
          };
        default:
          return { type: "text" as const };
      }
    };

    const inputProps = getInputProps();

    return (
      <Input
        ref={ref}
        label={label}
        error={displayError}
        helperText={helperText}
        suggestion={suggestion}
        onSuggestionClick={handleSuggestionClick}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        {...inputProps}
        {...props}
      />
    );
  }
);

FormField.displayName = "FormField";

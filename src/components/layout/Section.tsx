import React from "react";
import { BaseComponentProps } from "@/design-system/types";

export interface SectionProps extends BaseComponentProps {
  variant?: "default" | "bordered" | "subtle";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  spacing?: "sm" | "md" | "lg" | "xl";
}

const variantStyles: Record<NonNullable<SectionProps["variant"]>, string> = {
  default: "bg-ivory",
  bordered: "bg-ivory/90 border-b border-charcoal/5",
  subtle: "bg-ivory/50",
};

const paddingStyles: Record<NonNullable<SectionProps["padding"]>, string> = {
  none: "",
  sm: "py-6",
  md: "py-8",
  lg: "py-10",
  xl: "py-16",
};

const spacingStyles: Record<NonNullable<SectionProps["spacing"]>, string> = {
  sm: "space-y-3",
  md: "space-y-4",
  lg: "space-y-6",
  xl: "space-y-8",
};

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      variant = "default",
      padding = "md",
      spacing,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={`${variantStyles[variant]} ${paddingStyles[padding]} ${spacing ? spacingStyles[spacing] : ""} ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

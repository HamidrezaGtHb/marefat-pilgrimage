import React from "react";
import { BaseComponentProps } from "@/design-system/types";

export interface CardProps extends BaseComponentProps {
  variant?: "default" | "elevated" | "outlined" | "bordered";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

const variantStyles: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "bg-ivory/90 border-charcoal/5",
  elevated: "bg-ivory shadow-soft border-charcoal/5",
  outlined: "bg-transparent border-charcoal/10",
  bordered: "bg-ivory border-charcoal/10",
};

const paddingStyles: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-6",
  xl: "p-8",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      hover = false,
      padding = "md",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "rounded-2xl border";
    const hoverStyle = hover
      ? "transition hover:-translate-y-1 hover:shadow-soft"
      : "";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyle} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

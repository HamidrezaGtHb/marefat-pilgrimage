import React from "react";
import { BaseComponentProps, ColorVariant, SizeVariant } from "@/design-system/types";

export interface BadgeProps extends BaseComponentProps {
  variant?: ColorVariant | "gold";
  size?: SizeVariant;
  outlined?: boolean;
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  ivory: "bg-ivory text-charcoal border-charcoal/10",
  charcoal: "bg-charcoal text-ivory border-charcoal",
  gold: "bg-gold/10 text-charcoal border-gold/20",
};

const sizeStyles: Record<NonNullable<BadgeProps["size"]>, string> = {
  xs: "px-2 py-0.5 text-[10px]",
  sm: "px-2.5 py-1 text-[10px]",
  md: "px-3 py-1 text-xs",
  lg: "px-4 py-1.5 text-sm",
  xl: "px-5 py-2 text-base",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "gold",
      size = "sm",
      outlined = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center rounded-full border font-semibold uppercase tracking-[0.12em]";
    const outlineStyle = outlined
      ? "bg-transparent border-current"
      : variantStyles[variant];

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${sizeStyles[size]} ${outlineStyle} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

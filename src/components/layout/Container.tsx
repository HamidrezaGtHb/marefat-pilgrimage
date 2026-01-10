import React from "react";
import { BaseComponentProps } from "@/design-system/types";

export interface ContainerProps extends BaseComponentProps {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  noPadding?: boolean;
}

const sizeStyles: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  full: "max-w-full",
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = "xl",
      noPadding = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const paddingStyles = noPadding
      ? ""
      : "px-6 sm:px-8 lg:px-12";

    return (
      <div
        ref={ref}
        className={`mx-auto ${sizeStyles[size]} ${paddingStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

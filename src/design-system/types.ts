/**
 * Design System Types
 * TypeScript types for component props and design system
 */

import { ReactNode } from "react";

export type ColorVariant = "ivory" | "charcoal" | "gold";
export type SizeVariant = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "xs" | "sm" | "md" | "lg";

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export interface PolymorphicAsProp {
  as?: keyof JSX.IntrinsicElements;
}

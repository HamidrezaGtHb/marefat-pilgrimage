import React from "react";
import { Badge } from "./Badge";

interface PackageBadgeProps {
  level: "Premium" | "Economy";
  className?: string;
}

export const PackageBadge: React.FC<PackageBadgeProps> = ({
  level,
  className = "",
}) => {
  const isPremium = level === "Premium";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
        isPremium
          ? "bg-gradient-to-r from-gold/20 to-gold-soft/20 text-gold-dark border border-gold/30 shadow-sm"
          : "bg-gradient-to-r from-charcoal/5 to-charcoal/10 text-charcoal/80 border border-charcoal/15 shadow-sm"
      } ${className}`}
    >
      {isPremium ? (
        <svg
          className="h-3 w-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      )}
      {level}
    </span>
  );
};

import React from "react";
import { BaseComponentProps } from "@/design-system/types";
import { Badge } from "@/components/ui/Badge";

export interface PageHeaderProps extends BaseComponentProps {
  badge?: string;
  title: string;
  description?: string;
  badgeColor?: "gold" | "charcoal" | "ivory";
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  description,
  badgeColor = "gold",
  className = "",
}) => {
  return (
    <div className={className}>
      {badge && (
        <Badge variant={badgeColor} size="sm" className="mb-3">
          {badge}
        </Badge>
      )}
      <h1 className="mt-2 text-2xl font-semibold text-charcoal sm:text-3xl lg:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-charcoal/75 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
};

PageHeader.displayName = "PageHeader";

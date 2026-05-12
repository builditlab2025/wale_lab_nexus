// src/utils/iconUtils.ts
import * as LucideIcons from "lucide-react";
import React from "react";

// Define a reusable type for icon components
type IconComponentType = React.ComponentType<{ className?: string }>;

// Create a cache for loaded icons
const iconCache: Record<string, IconComponentType> = {};

// Helper function to get icon component dynamically
export const getIconComponent = (iconName: string): IconComponentType => {
  // Return cached icon if available
  if (iconCache[iconName]) {
    return iconCache[iconName];
  }

  // Safe lookup without using `any`
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as
    | IconComponentType
    | undefined;

  if (IconComponent) {
    iconCache[iconName] = IconComponent;
    return IconComponent;
  }

  // Return default icon if not found
  console.warn(`Icon "${iconName}" not found in lucide-react, using default`);
  return LucideIcons.HelpCircle as IconComponentType;
};

// Helper function to render icon as JSX
export const renderIcon = (iconName: string, className?: string) => {
  const IconComponent = getIconComponent(iconName);
  return React.createElement(IconComponent, {
    className: className || "w-5 h-5",
  });
};

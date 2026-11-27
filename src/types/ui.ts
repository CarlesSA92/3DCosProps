import type { ReactNode } from "react";

/** Common link or action descriptor for navigation and call-to-action lists. */
export type ActionItem = {
  id?: string;
  label: string;
  href?: string;
  disabled?: boolean;
};

/** Option used by reusable filter, select, and tab controls. */
export type SelectableOption<T extends string = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

/** Props for a reusable button primitive. */
export type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
};

/** Data model for a reusable card/list row. */
export type CardItem = {
  id: string;
  title: string;
  description?: string;
  image?: { src: string; alt: string };
  href?: string;
  badge?: string;
};

/** Generic list state labels shared by paginated/filterable lists. */
export type ListMessages = {
  empty: string;
  loadMore?: string;
  showLess?: string;
  endOfList?: string;
};

/** Generic filter control configuration. */
export type FilterOption<T extends string = string> = SelectableOption<T>;

/** Shared tab item shape, with optional accessible description. */
export type TabItem = {
  id: string;
  label: string;
  description?: string;
};

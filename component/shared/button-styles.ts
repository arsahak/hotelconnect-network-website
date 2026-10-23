import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "dark" | "outline" | "ghost" | "light" | "outline-light";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brass-500 text-white shadow-sm shadow-brass-700/20 hover:bg-brass-600",
  dark: "bg-ink-900 text-white hover:bg-ink-700",
  outline: "border border-brass-500 text-brass-600 hover:bg-brass-500 hover:text-white",
  ghost: "text-ink-700 hover:text-brass-600",
  light: "bg-white text-ink-900 hover:bg-cream",
  "outline-light": "border border-white/70 text-white hover:bg-white hover:text-ink-900",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.9375rem]",
};

/** Shared button look, usable on <button>, <a> and <Link>. */
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

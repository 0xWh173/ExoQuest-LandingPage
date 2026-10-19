import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Loader2 } from "lucide-react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "outline";

type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-gradient-to-b from-[var(--color-primary)] to-[#7e22ce] text-white hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary)] border border-[#a855f7]/50 font-semibold",
  secondary: "bg-[var(--color-secondary)] text-black hover:bg-[var(--color-secondary-hover)] border border-[#22d3ee]/50 font-semibold",
  ghost: "text-[var(--color-foreground)] hover:bg-white/10 hover:text-white",
  outline: "border border-[var(--color-glass-border)] bg-[var(--color-glass)] backdrop-blur-sm text-[var(--color-foreground)] hover:bg-white/10 hover:border-white/20",
  danger: "bg-gradient-to-b from-[var(--color-danger)] to-[#b91c1c] text-white hover:from-[var(--color-danger-hover)] hover:to-[var(--color-danger)] border border-[#f87171]/50 font-semibold",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs h-8",
  md: "px-4 py-2 text-sm h-10",
  lg: "px-6 py-3 text-base h-12",
  icon: "h-10 w-10 p-0 justify-center",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = "primary", size = "md", isLoading = false, leftIcon, rightIcon, className, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        aria-disabled={isLoading || disabled ? "true" : undefined}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] font-medium transition-all duration-300 ease-[var(--ease-spring)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090d]",
          "disabled:pointer-events-none disabled:opacity-50 disabled:grayscale-[0.5]",
          "hover:scale-[1.02] active:scale-[0.97]",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

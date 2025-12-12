import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const sizeMap: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

const variantMap: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus-visible:outline-blue-500 shadow-sm",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:outline-slate-400",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:outline-slate-300",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-500 shadow-sm",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  isLoading = false,
  className = "",
  disabled,
  ...rest
}: Props) => {
  return (
    <button
      className={`${baseClasses} ${sizeMap[size]} ${variantMap[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-b-transparent" />
      )}
      {leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
      <span className="inline-flex items-center gap-1">{children}</span>
      {rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
    </button>
  );
};

export default Button;

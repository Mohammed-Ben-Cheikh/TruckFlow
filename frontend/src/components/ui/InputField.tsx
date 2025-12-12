import type { InputHTMLAttributes, ReactNode } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const InputField = ({
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  className = "",
  ...rest
}: Props) => {
  const hasError = Boolean(error);
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}
      <div
        className={`flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm transition-shadow focus-within:ring-2 focus-within:ring-blue-500 ${
          hasError ? "border-red-400" : "border-slate-200"
        } ${className}`}
      >
        {leftIcon && <span className="text-slate-500">{leftIcon}</span>}
        <input
          className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
          {...rest}
        />
        {rightIcon && <span className="text-slate-500">{rightIcon}</span>}
      </div>
      {hint && !hasError && (
        <p className="text-xs text-slate-500">{hint}</p>
      )}
      {hasError && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;

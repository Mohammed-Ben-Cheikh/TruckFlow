import type { ReactNode } from "react";
import Button from "./Button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  showClose?: boolean;
};

const sizeMap: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};

const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  showClose = true,
}: ModalProps) => {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
    >
      <div
        className={`w-full rounded-2xl bg-white shadow-2xl ${sizeMap[size]}`}
      >
        <div className="flex items-start justify-between border-b px-6 py-4">
          <div className="space-y-1">
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {description && (
              <p className="text-sm text-slate-600">{description}</p>
            )}
          </div>
          {showClose && (
            <Button
              variant="ghost"
              size="sm"
              aria-label="Close"
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700"
            >
              ✕
            </Button>
          )}
        </div>

        <div className="px-6 py-4">{children}</div>

        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          {footer ?? (
            <>
              <Button variant="ghost" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit">Confirmer</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

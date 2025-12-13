import type { ReactNode } from "react";
import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import Modal from "./Modal";

export type FieldOption = { value: string; label: string };

export type FieldConfig = {
  name: string;
  label?: string;
  type?: "text" | "email" | "number" | "password" | "textarea" | "select";
  placeholder?: string;
  options?: FieldOption[]; // for select
  required?: boolean;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

type Props<TValues extends Record<string, unknown> = Record<string, unknown>> =
  {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    fields: FieldConfig[];
    initialValues?: TValues;
    onSubmit: (values: TValues) => Promise<void> | void;
    submitText?: string;
    cancelText?: string;
    size?: "sm" | "md" | "lg";
    showClose?: boolean;
    footer?: ReactNode; // optional override
  };

const FormModal = <
  TValues extends Record<string, unknown> = Record<string, unknown>
>({
  open,
  onClose,
  title,
  description,
  fields,
  initialValues = {} as TValues,
  onSubmit,
  submitText = "Confirmer",
  cancelText = "Annuler",
  size = "md",
  showClose = true,
  footer,
}: Props<TValues>) => {
  const [values, setValues] = useState<TValues>(() => {
    const base = { ...(initialValues as Record<string, unknown>) } as Record<
      string,
      unknown
    >;
    fields.forEach((f) => {
      if (base[f.name] === undefined) base[f.name] = "";
    });
    return base as TValues;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    fields.forEach((f) => {
      if (f.required && !values[f.name]) {
        next[f.name] = "Ce champ est requis";
      }
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (name: keyof TValues, v: unknown) => {
    setValues(
      (s) =>
        ({ ...(s as Record<string, unknown>), [name as string]: v } as TValues)
    );
    setErrors((s) => ({ ...s, [name]: "" }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    try {
      setSubmitting(true);
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size={size}
      showClose={showClose}
      hideFooter
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.name}>
              {f.type === "textarea" ? (
                <div className="flex flex-col gap-1">
                  {f.label && (
                    <label className="text-sm font-medium text-slate-700">
                      {f.label}
                    </label>
                  )}
                  <textarea
                    className={`w-full rounded-lg border px-3 py-2 text-sm ${
                      errors[f.name] ? "border-red-400" : "border-slate-200"
                    }`}
                    placeholder={f.placeholder}
                    value={values[f.name] as string}
                    onChange={(e) => handleChange(f.name, e.target.value)}
                  />
                  {f.hint && !errors[f.name] && (
                    <p className="text-xs text-slate-500">{f.hint}</p>
                  )}
                  {errors[f.name] && (
                    <p className="text-xs text-red-600">{errors[f.name]}</p>
                  )}
                </div>
              ) : f.type === "select" ? (
                <div className="flex flex-col gap-1">
                  {f.label && (
                    <label className="text-sm font-medium text-slate-700">
                      {f.label}
                    </label>
                  )}
                  <select
                    className={`w-full rounded-lg border bg-white px-3 py-2 text-sm ${
                      errors[f.name] ? "border-red-400" : "border-slate-200"
                    }`}
                    value={values[f.name] as string}
                    onChange={(e) => handleChange(f.name, e.target.value)}
                  >
                    <option value="">--</option>
                    {f.options?.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {f.hint && !errors[f.name] && (
                    <p className="text-xs text-slate-500">{f.hint}</p>
                  )}
                  {errors[f.name] && (
                    <p className="text-xs text-red-600">{errors[f.name]}</p>
                  )}
                </div>
              ) : (
                <InputField
                  label={f.label}
                  hint={f.hint}
                  error={errors[f.name]}
                  leftIcon={f.leftIcon}
                  rightIcon={f.rightIcon}
                  placeholder={f.placeholder}
                  type={f.type ?? "text"}
                  value={values[f.name] as string}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(f.name, e.target.value)
                  }
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          {footer ?? (
            <>
              <Button variant="ghost" onClick={onClose} type="button">
                {cancelText}
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Envoi..." : submitText}
              </Button>
            </>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default FormModal;

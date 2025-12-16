import type { ReactNode } from "react";
import Button from "./Button";
export type Column<T> = {
  key: string;
  title: string;
  render?: (row: T) => ReactNode;
  className?: string;
  width?: string;
};
type Props<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyText?: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  editButtonText?: string;
  deleteButtonText?: string;
  rowKey?: (row: T) => string | number;
  className?: string;
  maxHeight?: string;
  responsive?: boolean;
};

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  emptyText = "Aucun enregistrement",
  onEdit,
  onDelete,
  editButtonText = "Modifier",
  deleteButtonText = "Supprimer",
  rowKey = (r) => (r.id as string | number) ?? JSON.stringify(r),
  className,
  maxHeight,
  responsive = true,
}: Props<T>) => {
  const actionColCount = onEdit || onDelete ? 1 : 0;
  const renderTable = () => (
    <table className="w-full table-auto min-w-full divide-y divide-slate-100 text-left">
      <thead className="bg-slate-50">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              scope="col"
              className={`px-4 py-3 text-sm font-medium text-slate-600 ${
                col.className ?? ""
              } sticky top-0 z-10`}
              style={{ width: col.width }}
            >
              {col.title}
            </th>
          ))}
          {actionColCount > 0 && (
            <th className="px-4 py-3 text-sm font-medium text-slate-600 sticky top-0 z-10">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {loading ? (
          <tr>
            <td
              colSpan={columns.length + actionColCount}
              className="px-4 py-6 text-sm text-slate-500"
            >
              Chargement...
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length + actionColCount}
              className="px-4 py-6 text-sm text-slate-500"
            >
              {emptyText}
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={String(rowKey(row))} className="hover:bg-slate-50">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 text-sm text-slate-700 ${
                    col.className ?? ""
                  }`}
                >
                  {col.render ? col.render(row) : String(row[col.key] ?? "")}
                </td>
              ))}
              {actionColCount > 0 && (
                <td className="px-4 py-3 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    {onEdit && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEdit(row)}
                      >
                        <span className="hidden md:inline">
                          {editButtonText}
                        </span>
                        <span className="md:hidden">✏️</span>
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => onDelete(row)}
                      >
                        <span className="hidden md:inline">
                          {deleteButtonText}
                        </span>
                        <span className="md:hidden">🗑️</span>
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
  const renderMobile = () => (
    <div className="md:hidden p-2">
      {loading ? (
        <div className="px-4 py-6 text-sm text-slate-500">Chargement...</div>
      ) : data.length === 0 ? (
        <div className="px-4 py-6 text-sm text-slate-500">{emptyText}</div>
      ) : (
        data.map((row) => (
          <div
            key={String(rowKey(row))}
            className="mb-3 rounded-lg border bg-white p-3 shadow-sm"
          >
            <div className="space-y-2">
              {columns.map((col) => (
                <div
                  key={col.key}
                  className="flex items-start justify-between gap-4"
                >
                  <div className="text-xs text-slate-500">{col.title}</div>
                  <div className="text-sm text-slate-800">
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </div>
                  <div className="text-sm text-slate-800">
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </div>
                </div>
              ))}
              {(onEdit || onDelete) && (
                <div className="mt-2 flex items-center justify-end gap-2">
                  {onEdit && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(row)}
                    >
                      {editButtonText}
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => onDelete(row)}
                    >
                      {deleteButtonText}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
  return (
    <div
      className={`w-full rounded-lg border bg-white overflow-auto min-h-0 ${
        className ?? ""
      }`}
      style={{ maxHeight }}
    >
      {responsive ? (
        <>
          <div className="hidden md:block">{renderTable()}</div>
          {renderMobile()}
        </>
      ) : (
        <div>{renderTable()}</div>
      )}
    </div>
  );
};
export default Table;

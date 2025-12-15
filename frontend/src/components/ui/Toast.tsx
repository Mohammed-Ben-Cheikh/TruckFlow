import { useEffect, useState } from "react";
import { onToast } from "../../utils/toast";

type Item = {
  id: string;
  type?: "success" | "error" | "info";
  message: string;
  timeout?: number;
};

const ToastItem = ({
  item,
  onClose,
}: {
  item: Item;
  onClose: (id: string) => void;
}) => {
  useEffect(() => {
    const t = setTimeout(() => onClose(item.id), 2000);
    return () => clearTimeout(t);
  }, [item, onClose]);

  const bg =
    item.type === "success"
      ? "bg-green-500"
      : item.type === "error"
      ? "bg-red-500"
      : "bg-slate-700";

  return (
    <div className={`text-white px-4 py-2 rounded shadow ${bg}`} role="status">
      {item.message}
    </div>
  );
};

export const ToastContainer = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const off = onToast((t) => setItems(() => [t]));
    return off;
  }, []);

  const remove = (id: string) => setItems((s) => s.filter((i) => i.id !== id));

  if (items.length === 0) return null;

  return (
    <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
      {items.map((it) => (
        <ToastItem key={it.id} item={it} onClose={remove} />
      ))}
    </div>
  );
};

export default ToastContainer;

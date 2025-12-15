type Toast = {
  id: string;
  type?: "success" | "error" | "info";
  message: string;
  timeout?: number;
};

const listeners: Array<(t: Toast) => void> = [];

export function onToast(cb: (t: Toast) => void) {
  listeners.push(cb);
  return () => {
    const idx = listeners.indexOf(cb);
    if (idx >= 0) listeners.splice(idx, 1);
  };
}

export function notify(
  message: string,
  type: Toast["type"] = "info",
  timeout = 4000
) {
  const id = Math.random().toString(36).slice(2, 9);
  const t: Toast = { id, type, message, timeout };
  listeners.forEach((cb) => cb(t));
  return id;
}

export default { onToast, notify };

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface DropdownItem {
  label: string;
  icon?: ReactNode;        // user-provided (FA, BI, SVG, anything)
  onClick?: () => void;
  href?: string;
  danger?: boolean;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[][];
  align?: "left" | "right";
}

export function Dropdown({
  trigger,
  items,
  align = "right",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20"
      >
        {trigger}
      </button>

      {open && (
        <div
          className={`absolute z-50 mt-2 w-56 rounded-md bg-gray-800 divide-y divide-white/10 shadow-lg ${align === "right" ? "right-0" : "left-0"
            }`}
        >
          {items.map((group, gi) => (
            <div key={gi} className="py-1">
              {group.map((item, ii) => {
                const base =
                  "flex items-center gap-3 px-4 py-2 text-sm w-full text-left hover:bg-white/5";
                const color = item.danger
                  ? "text-red-400"
                  : "text-gray-300";

                return item.href ? (
                  <a
                    key={ii}
                    href={item.href}
                    className={`${base} ${color}`}
                    onClick={() => setOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <button
                    key={ii}
                    onClick={() => {
                      item.onClick?.();
                      setOpen(false);
                    }}
                    className={`${base} ${color}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

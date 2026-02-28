"use client";

import { createPortal } from "react-dom";

type DropdownProps = {
  children: React.ReactNode;
  target: React.RefObject<Element | null>;
  open?: boolean;
};

export const Dropdown = ({ children, target, open = false }: DropdownProps) => {
  if (!open) return;

  const pos = target.current?.getBoundingClientRect();
  return createPortal(
    <div
      style={{ top: pos ? pos.bottom + 2 : 0, left: pos?.left }}
      className={`${open ? "block" : "hidden"} absolute bg-secondary rounded-md divide-y divide-tertiary border-1 border-tertiary`}
    >
      {children}
    </div>,
    document.body,
  );
};

import React from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  close: React.MouseEventHandler;
  children?: React.ReactNode;
};

export const Modal = ({ open, close, children }: ModalProps) => {
  if (!open) return null;
  return createPortal(
    <div
      className="absolute bg-black/50 inset-0 z-50 backdrop-blur-[1px]"
      onClick={(e) => close(e)}
    >
      <div
        className={`
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            absolute rounded-md p-7.5
            bg-secondary
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

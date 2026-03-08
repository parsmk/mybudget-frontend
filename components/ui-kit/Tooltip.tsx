import { createPortal } from "react-dom";

type Variants = "danger" | "default";

type TooltipProps = {
  children: React.ReactNode;
  target: React.RefObject<Element | null>;
  open: boolean;
  variant?: Variants;
};

export const Tooltip = ({
  children,
  target,
  open,
  variant = "default",
}: TooltipProps) => {
  if (!open) return;

  const variantClasses: Record<Variants, string> = {
    danger: "bg-danger/90 border-2 border-danger text-white",
    default: "",
  };

  const pos = target.current?.getBoundingClientRect();
  return createPortal(
    <div
      style={{ top: pos?.top, left: pos?.left }}
      className={`fixed p-2 -translate-y-[105%] z-50 rounded-md ${variantClasses[variant]}`}
    >
      {children}
    </div>,
    document.body,
  );
};

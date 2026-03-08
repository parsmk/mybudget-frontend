import { useRef, useState } from "react";
import { Danger } from "../svgs/Danger";
import { Tooltip } from "./Tooltip";

export const ErrorTooltip = ({ errors }: { errors: string[] }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Danger
        ref={ref}
        className={`text-danger shrink-0 size-5 ${errors.length > 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      />
      <Tooltip target={ref} open={open} variant="danger">
        {errors}
      </Tooltip>
    </>
  );
};

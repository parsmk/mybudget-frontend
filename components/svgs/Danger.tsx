import { forwardRef } from "react";
import { SVGProps } from "./SVGProps";

export const Danger = forwardRef<SVGSVGElement, SVGProps>(
  ({ onClick, className, onMouseEnter, onMouseLeave }, ref) => {
    return (
      <svg
        ref={ref}
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 7V13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="16" r="1" fill="currentColor" />
      </svg>
    );
  },
);

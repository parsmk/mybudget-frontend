import { forwardRef } from "react";
import { SVGProps } from "./SVGProps";

export const Hamburger = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, onClick }, ref) => {
    return (
      <svg
        ref={ref}
        width="800px"
        height="800px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        className={`cursor-pointer ${className}`}
        stroke="currentColor"
        fill="currentColor"
        onClick={(e) => onClick?.(e)}
      >
        <path
          fillRule="evenodd"
          d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
        />
      </svg>
    );
  },
);

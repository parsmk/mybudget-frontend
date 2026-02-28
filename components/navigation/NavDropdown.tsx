"use client";

import { useRef, useState } from "react";
import { Dropdown } from "../ui-kit/Dropdown";
import { Hamburger } from "../svgs/Hamburger";

export const NavDropdown = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const ham = useRef<SVGSVGElement | null>(null);

  return (
    <>
      <div className="sm:hidden grow self-center">
        <Hamburger
          onClick={() => setOpen(!open)}
          ref={ham}
          className="size-5"
        />
        <Dropdown target={ham} open={open}>
          {children}
        </Dropdown>
      </div>
      <div className="hidden grow sm:block">{children}</div>
    </>
  );
};

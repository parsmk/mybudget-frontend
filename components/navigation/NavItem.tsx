import Link from "next/link";
import React from "react";

type NavItemProps = {
  label: string;
  href: string;
  onClick?: React.MouseEventHandler;
  classNames?: string;
};

export const NavItem = ({ label, href, onClick, classNames }: NavItemProps) => {
  return (
    <Link
      className={`block transition p-2 ${classNames}`}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
    >
      {label}
    </Link>
  );
};

import React from "react";

type NavItemProps = {
  label: string;
  onClick?: React.MouseEventHandler;
  classNames?: string;
};

export const NavItem = ({ label, onClick, classNames }: NavItemProps) => {
  return (
    <div
      className={`transition p-2 cursor-pointer ${classNames}`}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
    >
      {label}
    </div>
  );
};

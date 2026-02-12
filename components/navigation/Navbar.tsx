"use client";

import { ROUTES } from "@/app/_route-map";
import { NavItem } from "./NavItem";

export const Navbar = () => {
  return (
    <div className="h-full flex flex-col p-2 bg-primary">
      <div className="grow">
        <NavItem href={ROUTES.DASHBOARD} label="Dashboard" />
        <NavItem href={""} label="Budget" />
        <NavItem href={""} label="Linked Accounts" />
      </div>
      <div>
        <NavItem href={""} label="Logout" />
      </div>
    </div>
  );
};

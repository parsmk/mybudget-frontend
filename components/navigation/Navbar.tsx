"use client";

import { ROUTES } from "@/app/_route-map";
import { NavItem } from "./NavItem";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { mutate: logout } = useLogout();
  const router = useRouter();

  return (
    <div className="flex sm:flex-col p-2 bg-primary">
      <div className="grow">
        <NavItem
          onClick={() => router.push(ROUTES.PORTAL.DASHBOARD)}
          label="Dashboard"
        />
        <NavItem
          onClick={() => router.push(ROUTES.PORTAL.SYNOPSIS)}
          label="Synopsis"
        />
        <NavItem label="Accounts" />
      </div>
      <div>
        <NavItem
          onClick={async () => {
            logout();
            router.push(ROUTES.HOME);
          }}
          label="Logout"
        />
      </div>
    </div>
  );
};

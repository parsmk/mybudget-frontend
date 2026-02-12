"use client";

import { ROUTES } from "@/app/_route-map";
import { NavItem } from "./NavItem";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { mutate: logout } = useLogout();
  const router = useRouter();

  return (
    <div className="h-full flex flex-col p-2 bg-primary">
      <div className="grow">
        <NavItem
          onClick={() => router.push(ROUTES.DASHBOARD)}
          label="Dashboard"
        />
        <NavItem label="Budget" />
        <NavItem label="Linked Accounts" />
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

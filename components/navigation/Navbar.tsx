"use client";

import { ROUTES } from "@/app/_route-map";
import { NavItem } from "./NavItem";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter } from "next/navigation";
import { useAccounts } from "@/hooks/accounts/useAccounts";
import { useState } from "react";

export const Navbar = () => {
  const router = useRouter();
  const { mutate: logout } = useLogout();
  const { data: accounts } = useAccounts();
  const [showAccounts, setShowAccounts] = useState<boolean>(false);

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
        <NavItem
          label="Accounts"
          onClick={() => setShowAccounts(!showAccounts)}
        />
        {accounts &&
          showAccounts &&
          accounts.map((a) => (
            <NavItem
              key={a.id}
              label={a.name}
              onClick={() => router.push(ROUTES.PORTAL.ACCOUNT(a.id))}
            />
          ))}
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

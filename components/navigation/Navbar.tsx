"use client";

import { ROUTES } from "@/app/_route-map";
import { NavItem } from "./NavItem";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter } from "next/navigation";
import { useAccounts } from "@/hooks/accounts/useAccounts";
import { NavDropdown } from "./NavDropdown";

export const Navbar = () => {
  const router = useRouter();
  const { mutate: logout } = useLogout();
  const { data: accounts } = useAccounts();

  return (
    <div className="flex sm:flex-col p-2 bg-primary">
      <NavDropdown>
        <NavItem
          onClick={() => {
            router.push(ROUTES.PORTAL.DASHBOARD);
          }}
          label="Dashboard"
        />
        <NavItem
          onClick={() => {
            router.push(ROUTES.PORTAL.SYNOPSIS);
          }}
          label="Synopsis"
        />
        {accounts &&
          accounts.map((a) => (
            <NavItem
              key={a.id}
              label={a.name}
              onClick={() => {
                router.push(ROUTES.PORTAL.ACCOUNT(a.id));
              }}
            />
          ))}
      </NavDropdown>
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

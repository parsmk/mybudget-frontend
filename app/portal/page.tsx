"use client";

import { AccountsCard } from "@/components/dashboard/AccountsCard";
import { CategoriesCard } from "@/components/dashboard/CategoriesCard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useAccounts } from "@/hooks/accounts/useAccounts";
import { useCategories } from "@/hooks/categories/useCategories";

const PortalLandingPage = () => {
  const { data: categories } = useCategories();
  const { data: accounts } = useAccounts();
  return (
    <div className="h-full grid gap-10 grid-cols-2 grid-rows-2 p-10">
      <div className="col-span-full">
        <DashboardCard>
          <h2 className="h-full text-5xl w-full flex justify-center items-center">
            Welcome user!
          </h2>
        </DashboardCard>
      </div>
      <CategoriesCard categories={categories} />
      <AccountsCard accounts={accounts} />
    </div>
  );
};

export default PortalLandingPage;

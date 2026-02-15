"use client";

import { CategoriesCard } from "@/components/dashboard/CategoriesCard";
import { useCategories } from "@/hooks/categories/useCategories";

const PortalLandingPage = () => {
  const { data: categories } = useCategories();
  return (
    <div className="h-full grid gap-10 grid-cols-2 grid-rows-2 p-10">
      <div className="bg-foreground/10 w-full h-full rounded-md">Accounts</div>
      <CategoriesCard categories={categories} />
    </div>
  );
};

export default PortalLandingPage;

import { useCreateCategory } from "@/hooks/categories/useCreateCategory";
import { DashboardCard } from "./DashboardCard";
import { Category } from "@/api/category";
import { InputField } from "../ui-kit/InputField";
import { useState } from "react";
import { CategoryRow } from "./CategoryRow";

export const CategoriesCard = ({
  categories,
}: {
  categories: Category[] | undefined;
}) => {
  const { mutateAsync: createCategory } = useCreateCategory();
  const [newCat, setNewCat] = useState<string>("");

  const handleSubmit = async () => {
    try {
      if (newCat.trim() === "") return;
      await createCategory({ name: newCat });
      setNewCat("");
    } catch (err) {}
  };

  return (
    <DashboardCard title="Categories">
      <div className="grid grid-cols-1 auto-rows-max gap-2 p-2">
        {categories &&
          categories.map((c) => <CategoryRow key={c.id} category={c} />)}
        <InputField
          type="text"
          name="newCat"
          placeholder="new category..."
          variant="grid"
          value={newCat}
          onChange={(e) => setNewCat(e.currentTarget.value)}
          onKeyDown={(e) => (e.key === "Enter" ? handleSubmit() : null)}
          onBlur={() => handleSubmit()}
        />
      </div>
    </DashboardCard>
  );
};

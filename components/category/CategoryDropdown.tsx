import { useCategories } from "@/hooks/categories/useCategories";
import { SelectField } from "../ui-kit/SelectField";
import { Category } from "@/api/category";

type CategoryDropdownProps = {
  value: Category | null;
  setValue: (cat: Category | null) => void;
};

export const CategoryDropdown = ({
  value,
  setValue,
}: CategoryDropdownProps) => {
  const { data: categories } = useCategories();

  return (
    <SelectField
      value={value}
      labelFn={(c) => {
        if (c) return c.name;
        else return "none";
      }}
      idFn={(c) => {
        if (c) return c.id;
        else return "none";
      }}
      onChange={(e) => {
        const val = categories?.find((c) => c.id === e.currentTarget.value);
        setValue(val ?? null);
      }}
      options={categories ?? []}
      defaultOption={"uncategorized"}
    />
  );
};

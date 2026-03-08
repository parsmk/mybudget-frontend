import { useCategories } from "@/hooks/categories/useCategories";
import { SelectField } from "../ui-kit/SelectField";
import { Category } from "@/api/category";

type CategoryDropdownProps = {
  value: Category | undefined;
  setValue: (cat: Category | undefined) => void;
};

export const CategoryDropdown = ({
  value,
  setValue,
}: CategoryDropdownProps) => {
  const { data: categories } = useCategories();

  return (
    <SelectField
      value={value}
      labelFn={(c) => c.name}
      idFn={(c) => c.id ?? "default"}
      onChange={(e) => {
        if (e.currentTarget.value === "default") return setValue(undefined);
        const val = categories?.find((c) => c.id === e.currentTarget.value);
        setValue(val);
      }}
      options={categories ?? []}
      defaultOption={"uncategorized"}
    />
  );
};

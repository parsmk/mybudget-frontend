import { useCategories } from "@/hooks/categories/useCategories";
import { Dropdown } from "./ui-kit/Dropdown";
import { Category } from "@/api/category";
import React, { Dispatch, SetStateAction } from "react";

type CategoryDropdownProps = {
  value?: Category;
  setValue: Dispatch<SetStateAction<Category | undefined>>;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};

export const CategoryDropdown = ({
  value,
  setValue,
  onChange,
}: CategoryDropdownProps) => {
  const { data: categories } = useCategories();

  return (
    <Dropdown
      value={value}
      labelFn={(c) => c.name}
      idFn={(c) => c.id}
      onChange={(e) => {
        const val = categories?.find((c) => c.id === e.currentTarget.value);
        setValue(val ?? undefined);
        onChange?.(e);
      }}
      options={categories ?? []}
      defaultOption={"uncategorized"}
    />
  );
};

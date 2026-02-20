import { useCategories } from "@/hooks/categories/useCategories";
import { Dropdown } from "./ui-kit/Dropdown";
import { Category } from "@/api/category";
import React, { Dispatch, SetStateAction } from "react";

type CategoryDropdownProps = {
  value: Category | null;
  setValue: Dispatch<SetStateAction<Category | null>>;
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
        onChange?.(e);
      }}
      options={categories ?? []}
      defaultOption={"uncategorized"}
    />
  );
};

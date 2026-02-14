import { useEditCategory } from "@/hooks/categories/useEditCategory";
import { useDeleteCategory } from "@/hooks/categories/useDeleteCategory";

import { Category } from "@/api/category";
import { PencilIcon } from "../svgs/PencilIcon";
import { TrashIcon } from "../svgs/TrashIcon";
import { InputField } from "../ui-kit/InputField";
import { useRef, useState } from "react";

export const CategoryRow = ({ category }: { category: Category }) => {
  const { mutateAsync: editCategory } = useEditCategory();
  const { mutateAsync: deleteCategory } = useDeleteCategory();

  const [edit, setEdit] = useState<boolean>(false);
  const [cat, setCat] = useState<string>(category.name);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const iconClasses = "size-5 mx-0.5 transition";

  const handleDelete = async () => {
    try {
      await deleteCategory(category.id);
    } catch (err) {}
  };

  const handleEdit = async () => {
    try {
      if (category.name === cat) return;
      await editCategory({ id: category.id, name: cat });
    } catch (err) {}
  };

  return (
    <div className="flex items-center">
      <InputField
        ref={inputRef}
        type="text"
        state={edit ? "default" : "display"}
        variant="grid"
        name={category.id}
        onChange={(e) => setCat(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEdit();
            e.currentTarget.blur();
            setEdit(false);
          } else if (e.key === "Escape") {
            setEdit(false);
            setCat(category.name);
            e.currentTarget.blur();
          }
        }}
        onBlur={() => setEdit(false)}
        value={cat}
      />
      <div className="flex mx-2">
        <PencilIcon
          className={`text-tertiary/50 hover:text-tertiary ${iconClasses}`}
          onClick={() => {
            setEdit(!edit);
            inputRef.current?.focus();
          }}
        />
        <TrashIcon
          className={`text-danger/50 hover:text-danger ${iconClasses}`}
          onClick={() => handleDelete()}
        />
      </div>
    </div>
  );
};

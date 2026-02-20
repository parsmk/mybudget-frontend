import React from "react";

type DropdownProps<T> = {
  options: T[];
  labelFn?: (item: T) => string;
  idFn?: (item: T) => string;
  value?: T;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  defaultOption?: string;
  disabled?: boolean;
  variant?: "grid" | "default";
};

export const Dropdown = <T,>({
  options,
  labelFn = (item: T) => String(item),
  idFn = (item: T) => String(item),
  value,
  onChange,
  defaultOption,
  disabled,
  variant = "grid",
}: DropdownProps<T>) => {
  const optionClasses = "bg-background";
  const variantClasses =
    variant === "default" ? "border-1 border-foreground/50" : "";
  return (
    <select
      className={`w-full h-full rounded-md focus:outline-none focus:ring-none ${variantClasses}`}
      value={value ? idFn(value) : "none"}
      onChange={(e) => onChange?.(e)}
      disabled={disabled}
    >
      {defaultOption ? (
        <option value={undefined} className={optionClasses}>
          {defaultOption}
        </option>
      ) : null}
      {options.map((o) => (
        <option key={idFn(o)} value={idFn(o)} className={optionClasses}>
          {labelFn(o)}
        </option>
      ))}
    </select>
  );
};

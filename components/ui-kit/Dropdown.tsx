import React from "react";

type DropdownProps<T> = {
  options: T[];
  labelFn?: (item: T) => string;
  idFn?: (item: T) => string;
  value?: T;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  defaultOption?: string;
  disabled?: boolean;
};

export const Dropdown = <T,>({
  options,
  labelFn = (item: T) => String(item),
  idFn = (item: T) => String(item),
  value,
  onChange,
  defaultOption,
  disabled,
}: DropdownProps<T>) => {
  return (
    <select
      className="w-full h-full rounded-md focus:outline-none focus:ring-none"
      value={value ? idFn(value) : "none"}
      onChange={(e) => onChange?.(e)}
      disabled={disabled}
    >
      {defaultOption ? (
        <option value={undefined} className={`text-foreground/50`}>
          {defaultOption}
        </option>
      ) : null}
      {options.map((o) => (
        <option key={idFn(o)} value={idFn(o)}>
          {labelFn(o)}
        </option>
      ))}
    </select>
  );
};

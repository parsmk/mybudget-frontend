import React from "react";

type DropdownProps<T> = {
  options: T[];
  labelFn?: (item: T) => string;
  idFn?: (item: T) => string;
  value?: T;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  defaultOption?: string;
};

export const Dropdown = <T,>({
  options,
  labelFn = (item: T) => String(item),
  idFn = (item: T) => String(item),
  value,
  onChange,
  defaultOption,
}: DropdownProps<T>) => {
  return (
    <select
      className="w-full h-full rounded-md focus:outline-none focus:ring-none"
      value={value ? idFn(value) : "none"}
      onChange={(e) => onChange?.(e)}
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

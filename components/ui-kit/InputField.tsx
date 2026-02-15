import React, { forwardRef } from "react";

export type InputFieldTypes = "text" | "password" | "date" | "number";

export type InputFieldStates = "default" | "disabled" | "display";

export type InputFieldVariants = "default" | "grid";

type InputFieldProps = {
  type: InputFieldTypes;
  name?: string;
  label?: string;
  placeholder?: string;
  state?: InputFieldStates;
  value?: string | number;
  variant?: InputFieldVariants;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      type,
      name,
      label,
      placeholder,
      state = "default",
      value,
      defaultValue,
      variant = "default",
      onChange,
      onKeyDown,
      onBlur,
      onFocus,
    },
    ref,
  ) => {
    const stateClasses: Record<InputFieldStates, string> = {
      disabled: "cursor-disabled pointer-events-none",
      display: "cursor-default pointer-events-none",
      default: "",
    };

    const variantClasses: Record<InputFieldVariants, string> = {
      default:
        "border-foreground/20 hover:border-foreground/50 hover:text-foreground focus:text-foreground",
      grid: "text-foreground/75 border-foreground/0 hover:border-foreground/50",
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block my-1" htmlFor={name}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder ?? `${label}...`}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          onFocus={onFocus}
          className={`
            border-1 p-2 rounded-md w-full
            transition focus:border-foreground/50 focus:outline-none hover:text-foreground focus:text-foreground ${stateClasses[state]} ${variantClasses[variant]}`}
        />
      </div>
    );
  },
);

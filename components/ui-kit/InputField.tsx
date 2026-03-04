import React, { forwardRef } from "react";

export type InputFieldTypes = "text" | "password" | "date" | "number";

export type InputFieldVariants = "default" | "grid";

type InputFieldProps = {
  type: InputFieldTypes;
  name: string;
  label?: string;
  placeholder?: string;
  value?: string | number;
  variant?: InputFieldVariants;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: string[];
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
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
      value,
      defaultValue,
      variant = "default",
      required = false,
      disabled = false,
      errors,
      leftAdornment,
      rightAdornment,
      onChange,
      onKeyDown,
      onBlur,
      onFocus,
    },
    ref,
  ) => {
    const variantClasses: Record<InputFieldVariants, string> = {
      default: "border-foreground/20",
      grid: "text-foreground/75 border-foreground/0",
    };

    const variantInteractivity: Record<InputFieldVariants, string> = {
      default:
        "hover:border-foreground/50 hover:text-foreground focus:text-foreground",
      grid: "hover:border-foreground/50",
    };

    const adornmentClasses = `${value ? "opacity-100" : "opacity-50"}`;

    return (
      <div className="w-full">
        {label && (
          <label className="block my-1" htmlFor={name}>
            <span>{label}</span>
            {required ? <span className="text-danger ml-1">*</span> : null}
          </label>
        )}
        <div
          className={`${variantClasses[variant]} ${disabled ? "" : variantInteractivity[variant]}
            border-1 p-2 rounded-md w-full flex dark:[color-scheme:dark]
            transition focus-within:border-foreground/50 focus-within:text-foreground hover:text-foreground
          `}
        >
          {<div className={adornmentClasses}>{leftAdornment}</div>}
          <input
            ref={ref}
            type={type}
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder ?? `${label}...`}
            disabled={disabled}
            required={required}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onFocus={onFocus}
            className="grow focus:outline-none"
          />
          {<div className={adornmentClasses}>{rightAdornment}</div>}
        </div>
        {errors &&
          errors.length > 0 &&
          errors.map((err, i) => (
            <p key={i} className="text-danger">
              {err}
            </p>
          ))}
      </div>
    );
  },
);

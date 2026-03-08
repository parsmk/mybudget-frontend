import { forwardRef, useRef, useState } from "react";
import { Danger } from "../svgs/Danger";
import { Tooltip } from "./Tooltip";

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
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyEscape?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
      onBlur,
      onFocus,
      onKeyEnter,
      onKeyEscape,
    },
    ref,
  ) => {
    const [errsOpen, setErrsOpen] = useState<boolean>(false);
    const errorIcon = useRef<SVGSVGElement | null>(null);

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
          {leftAdornment && (
            <div className={adornmentClasses}>{leftAdornment}</div>
          )}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onKeyEnter?.(e);
                e.currentTarget.blur();
              } else if (e.key === "Escape") {
                onKeyEscape?.(e);
                e.currentTarget.blur();
              }
            }}
            onBlur={onBlur}
            onFocus={onFocus}
            className="grow focus:outline-none "
          />
          {rightAdornment && (
            <div className={adornmentClasses}>{rightAdornment}</div>
          )}
          {
            <div className="ml-1">
              <Danger
                ref={errorIcon}
                className={`text-danger size-5 ${errors && errors.length > 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onMouseEnter={() => setErrsOpen(true)}
                onMouseLeave={() => setErrsOpen(false)}
              />
              <Tooltip target={errorIcon} open={errsOpen} variant="danger">
                {errors}
              </Tooltip>
            </div>
          }
        </div>
      </div>
    );
  },
);

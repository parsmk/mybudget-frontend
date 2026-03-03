import { useEffect, useState } from "react";
import { InputField, InputFieldVariants } from "./InputField";

type CurrencyFieldProps = {
  name: string;
  value?: number;
  variant?: InputFieldVariants;
  errors?: string[];
  disabled?: boolean;
  setValue?: (v: number | undefined) => void;
};

function parseMoneyText(s: string) {
  const t = s.trim();
  if (!t) return undefined;
  const n = Number(t);
  return Number.isFinite(n) ? n : undefined;
}

export const CurrencyField = ({
  name,
  value,
  variant,
  errors,
  disabled,
  setValue,
}: CurrencyFieldProps) => {
  const [_value, _setValue] = useState<string>(String(value?.toFixed(2) ?? ""));

  useEffect(() => {
    _setValue(value == null ? "" : value.toFixed(2));
  }, [value]);

  return (
    <InputField
      name={name}
      type="text"
      value={_value}
      variant={variant}
      errors={errors}
      disabled={disabled}
      placeholder={(0).toFixed(2)}
      onChange={(e) => _setValue(e.currentTarget.value)}
      onBlur={() => {
        const candidate = parseMoneyText(_value);
        setValue?.(candidate);
      }}
      leftAdornment="$"
    />
  );
};

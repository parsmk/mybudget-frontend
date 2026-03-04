import { useState } from "react";
import { InputField, InputFieldVariants } from "./InputField";

type CurrencyFieldProps = {
  name: string;
  value?: number;
  defaultValue?: number;
  variant?: InputFieldVariants;
  errors?: string[];
  disabled?: boolean;
  setValue?: (v: number | undefined) => void;
};

function parseMoneyText(s: string | null) {
  if (!s) return undefined;
  const t = s.trim();
  if (!t) return undefined;
  const n = Number(t);
  return Number.isFinite(n) ? n : undefined;
}

export const CurrencyField = ({
  name,
  value,
  defaultValue,
  variant,
  errors,
  disabled,
  setValue,
}: CurrencyFieldProps) => {
  const [draftValue, setDraftValue] = useState<string | null>(null);

  const displayValue = draftValue ?? value?.toFixed(2) ?? "";

  return (
    <InputField
      name={name}
      type="text"
      value={displayValue}
      variant={variant}
      errors={errors}
      disabled={disabled}
      placeholder={(0).toFixed(2)}
      onFocus={() => {
        setDraftValue(value?.toFixed(2) ?? "");
      }}
      onChange={(e) => {
        const raw = e.currentTarget.value;
        if (/^\d*\.?\d*$/.test(raw)) {
          setDraftValue(raw);
        }
      }}
      onBlur={() => {
        setValue?.(parseMoneyText(draftValue));
        setDraftValue(null);
      }}
      leftAdornment="$"
    />
  );
};

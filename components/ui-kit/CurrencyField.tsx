import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { InputField, InputFieldStates, InputFieldVariants } from "./InputField";

type CurrencyFieldProps = {
  name: string;
  value?: number;
  variant?: InputFieldVariants;
  state?: InputFieldStates;
  errors?: string[];
  setValue?: Dispatch<SetStateAction<number | undefined>>;
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
  state = "default",
  errors,
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
      state={state}
      variant={variant}
      errors={errors}
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

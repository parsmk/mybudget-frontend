import { Dispatch, SetStateAction } from "react";

type InputFieldProps = {
  type: "text" | "password";
  name: string;
  label: string;
  placeholder?: string;
  onChange: Dispatch<SetStateAction<string>>;
};

export const InputField = ({
  type,
  name,
  label,
  placeholder,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="w-full">
      <label className="block my-1" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder ?? `${label}...`}
        onChange={(e) => onChange(e.currentTarget.value)}
        className={`
            p-2 rounded-md w-full
            border-1 border-foreground/20 text-foreground/50
            transition hover:border-foreground/50 focus:border-foreground/50 hover:text-foreground focus:text-foreground focuse:shadow-sm
        `}
      />
    </div>
  );
};

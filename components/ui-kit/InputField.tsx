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
    <div className="my-4">
      <label className="block my-1" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder ?? `${label}...`}
        onChange={(e) => onChange(e.currentTarget.value)}
        className={`
            p-2 rounded-md
            outline-1 outline-foreground/10 text-foreground/50
            transition hover:outline-foreground/50 focus:outline-foreground/50 hover:text-foreground focus:text-foreground focuse:shadow-sm
        `}
      />
    </div>
  );
};

import { AccountType } from "@/api/account";
import { CurrencyField } from "../ui-kit/CurrencyField";
import { InputField } from "../ui-kit/InputField";
import { SelectField } from "../ui-kit/SelectField";
import { Dispatch, SetStateAction } from "react";

type AccountCellsProps = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  balance: number;
  setBalance: Dispatch<SetStateAction<number>>;
  type: AccountType;
  setType: Dispatch<SetStateAction<AccountType>>;
};

export const AccountCells = ({
  name,
  setName,
  balance,
  setBalance,
  type,
  setType,
}: AccountCellsProps) => {
  return (
    <>
      <td>
        <InputField
          name="name"
          type="text"
          variant="grid"
          value={name}
          placeholder="account title..."
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </td>
      <td>
        <CurrencyField
          name="balance"
          variant="grid"
          value={balance}
          setValue={(v) => setBalance(v ?? 0)}
        />
      </td>
      <td className="p-2">
        <SelectField<AccountType>
          options={Object.values(AccountType)}
          value={type}
          onChange={(e) => setType(e.target.value as AccountType)}
          labelFn={(t) => t}
        />
      </td>
    </>
  );
};

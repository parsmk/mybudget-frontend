import { Account, AccountType } from "@/api/account";
import { InputField } from "../ui-kit/InputField";
import { Dropdown } from "../ui-kit/Dropdown";
import { Button } from "../ui-kit/Button";
import { useMemo, useState } from "react";

export const AccountRow = ({ account }: { account: Account }) => {
  const [name, setName] = useState<string>(account.name);
  const [balance, setBalance] = useState<number>(account.balance);
  const [type, setType] = useState<AccountType>(account.type);

  const valid = useMemo(() => {
    if (balance < 0) return false;
    if (!name || name.trim().length < 1) return false;

    return true;
  }, [name, balance]);

  return (
    <>
      <td>
        <InputField
          type="text"
          variant="grid"
          state="display"
          value={name}
          placeholder="account title..."
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </td>
      <td>
        <InputField
          state="display"
          type="number"
          variant="grid"
          value={balance}
          onChange={(e) => setBalance(Number(e.currentTarget.value))}
        />
      </td>
      <td className="p-2">
        <Dropdown
          disabled
          options={Object.values(AccountType)}
          value={type}
          onChange={(e) => setType(e.target.value as AccountType)}
          labelFn={(t) => t}
        />
      </td>
      <td className="p-2">
        <div className="w-fit mx-auto">
          <Button size="sm" disabled={!valid}>
            Edit
          </Button>
        </div>
      </td>
    </>
  );
};

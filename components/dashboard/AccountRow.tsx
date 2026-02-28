import { Account, AccountType } from "@/api/account";
import { InputField } from "../ui-kit/InputField";
import { SelectField } from "../ui-kit/SelectField";
import { Button } from "../ui-kit/Button";
import { useMemo, useState } from "react";
import { useEditAccount } from "@/hooks/accounts/useEditAccount";
import { useDeleteAccount } from "@/hooks/accounts/useDeleteAccount";
import { CurrencyField } from "../ui-kit/CurrencyField";

export const AccountRow = ({ account }: { account: Account }) => {
  const { mutateAsync: editAccount } = useEditAccount();
  const { mutate: deleteAccount } = useDeleteAccount();

  const [name, setName] = useState<string>(account.name);
  const [balance, setBalance] = useState<number | undefined>(account.balance);
  const [type, setType] = useState<AccountType>(account.type);
  const [edit, setEdit] = useState<boolean>(false);

  const valid = useMemo(() => {
    if (balance == null || balance < 0) return false;
    if (!name || name.trim().length < 1) return false;

    return true;
  }, [name, balance]);

  const handleSubmit = async () => {
    try {
      if (balance == null) return;
      await editAccount({
        id: account.id,
        name: name,
        balance: balance,
        type: type,
      });
    } catch (err) {}
  };

  return (
    <>
      <td>
        <InputField
          name="name"
          type="text"
          variant="grid"
          state={edit ? "default" : "display"}
          value={name}
          placeholder="account title..."
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </td>
      <td>
        <CurrencyField
          name="balance"
          state={edit ? "default" : "display"}
          variant="grid"
          value={balance}
          setValue={setBalance}
        />
      </td>
      <td className="p-2">
        <SelectField
          disabled={!edit}
          options={Object.values(AccountType)}
          value={type}
          onChange={(e) => setType(e.target.value as AccountType)}
          labelFn={(t) => t}
        />
      </td>
      <td className="p-2 flex items-center h-full w-full justify-around">
        <Button
          size="sm"
          disabled={!valid}
          onClick={() => {
            if (!edit) setEdit(true);
            else {
              handleSubmit();
              setEdit(false);
            }
          }}
        >
          {edit ? "Save" : "Edit"}
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => deleteAccount(account.id)}
        >
          Delete
        </Button>
      </td>
    </>
  );
};

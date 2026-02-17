import { Account, AccountType } from "@/api/account";
import { InputField } from "../ui-kit/InputField";
import { Dropdown } from "../ui-kit/Dropdown";
import { Button } from "../ui-kit/Button";
import { useMemo, useState } from "react";
import { useEditAccount } from "@/hooks/accounts/useEditAccount";
import { useDeleteAccount } from "@/hooks/accounts/useDeleteAccount";

export const AccountRow = ({ account }: { account: Account }) => {
  const { mutateAsync: editAccount } = useEditAccount();
  const { mutate: deleteAccount } = useDeleteAccount();

  const [name, setName] = useState<string>(account.name);
  const [balance, setBalance] = useState<number>(account.balance);
  const [type, setType] = useState<AccountType>(account.type);
  const [edit, setEdit] = useState<boolean>(false);

  const valid = useMemo(() => {
    if (balance < 0) return false;
    if (!name || name.trim().length < 1) return false;

    return true;
  }, [name, balance]);

  const handleSubmit = async () => {
    try {
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
          type="text"
          variant="grid"
          state={edit ? "default" : "display"}
          value={name}
          placeholder="account title..."
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </td>
      <td>
        <InputField
          state={edit ? "default" : "display"}
          type="number"
          variant="grid"
          value={balance}
          onChange={(e) => setBalance(Number(e.currentTarget.value))}
        />
      </td>
      <td className="p-2">
        <Dropdown
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

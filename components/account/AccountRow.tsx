import { Account, AccountType } from "@/api/account";
import { Button } from "../ui-kit/Button";
import { useMemo, useState } from "react";
import { useEditAccount } from "@/hooks/accounts/useEditAccount";
import { useDeleteAccount } from "@/hooks/accounts/useDeleteAccount";
import { AccountCells } from "./AccountCells";

export const AccountRow = ({ account }: { account: Account }) => {
  const { mutateAsync: editAccount } = useEditAccount();
  const { mutate: deleteAccount } = useDeleteAccount();

  const [name, setName] = useState<string>(account.name);
  const [balance, setBalance] = useState<number>(account.balance);
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
      <AccountCells
        name={name}
        balance={balance}
        type={type}
        setName={setName}
        setBalance={setBalance}
        setType={setType}
        disabled={!edit}
      />
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
          onClick={() => (edit ? setEdit(!edit) : deleteAccount(account.id))}
        >
          {edit ? "Cancel" : "Delete"}
        </Button>
      </td>
    </>
  );
};

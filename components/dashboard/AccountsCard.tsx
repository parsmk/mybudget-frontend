import { DashboardCard } from "./DashboardCard";
import { Account, AccountType } from "@/api/account";
import { AccountRow } from "./AccountRow";
import { Button } from "../ui-kit/Button";
import { useMemo, useState } from "react";
import { InputField } from "../ui-kit/InputField";
import { Dropdown } from "../ui-kit/Dropdown";
import { useCreateAccount } from "@/hooks/accounts/useCreateAccount";

export const AccountsCard = ({
  accounts,
}: {
  accounts: Account[] | undefined;
}) => {
  const { mutateAsync: createAccount, error: createError } = useCreateAccount();

  const [name, setName] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [type, setType] = useState<AccountType>(AccountType.CHEQUING);

  const valid = useMemo(() => {
    if (balance < 0) return false;
    if (!name || name.trim().length < 1) return false;

    return true;
  }, [name, balance]);

  const handleSubmit = async () => {
    try {
      await createAccount({
        name: name,
        balance: balance,
        type: type,
      });
      setName("");
      setBalance(0);
      setType(AccountType.CHEQUING);
    } catch (err) {}
  };

  const rowClasses =
    "divide-x border-1 border-foreground/10 divide-foreground/10";

  return (
    <DashboardCard title="Accounts">
      <table className="w-full mt-2">
        <thead className="text-left">
          <tr>
            <th className="p-2 font-normal">Account Name</th>
            <th className="p-2 font-normal">Balance</th>
            <th className="p-2 font-normal">Type</th>
          </tr>
        </thead>
        <tbody className="border-1 border-foreground/10">
          {accounts &&
            accounts.map((a) => (
              <tr className={rowClasses}>
                <AccountRow key={a.id} account={a} />
              </tr>
            ))}

          <tr
            className={`${rowClasses} ${createError ? "!border-danger/10" : ""}`}
          >
            <td>
              <InputField
                type="text"
                variant="grid"
                value={name}
                placeholder="account title..."
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </td>
            <td>
              <InputField
                type="number"
                variant="grid"
                value={balance}
                onChange={(e) => setBalance(Number(e.currentTarget.value))}
              />
            </td>
            <td className="p-2">
              <Dropdown<AccountType>
                options={Object.values(AccountType)}
                value={type}
                onChange={(e) => setType(e.target.value as AccountType)}
                labelFn={(t) => t}
              />
            </td>
            <td className="p-2">
              <div className="w-fit mx-auto">
                <Button
                  size="sm"
                  disabled={!valid}
                  onClick={() => handleSubmit()}
                >
                  Create
                </Button>
                {createError && <p>{createError.message}</p>}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </DashboardCard>
  );
};

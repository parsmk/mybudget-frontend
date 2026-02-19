"use client";

import { FileIOModal } from "@/components/FileIOModal";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { Button } from "@/components/ui-kit/Button";
import { Dropdown } from "@/components/ui-kit/Dropdown";
import { InputField } from "@/components/ui-kit/InputField";
import { useAccount } from "@/hooks/accounts/useAccount";
import { useAccountTransactions } from "@/hooks/transactions/useAccountTransactions";
import { use, useState } from "react";

type ValidPeriods = "1 month" | "3 month" | "6 month" | "12 month";

const AccountPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: account } = useAccount(id);
  const { data: transactions } = useAccountTransactions(id);

  const [open, setOpen] = useState<boolean>(false);
  const [to, setTo] = useState<Date>(new Date());
  const [from, setFrom] = useState<Date>(() => {
    const curr = new Date();
    curr.setMonth(curr.getMonth() - 1);
    return curr;
  });

  return (
    <div className="flex flex-col h-full">
      {account && (
        <FileIOModal
          open={open}
          close={() => setOpen(false)}
          accountID={account.id}
        />
      )}
      <div className="p-2 flex">
        <div className="space-y-2">
          <Button type="button" onClick={() => setOpen(true)} fullWidth>
            Import Statement
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <InputField label="From" type="date" />
              <InputField label="To" type="date" />
            </div>
          </div>
        </div>
        <div className="px-5">
          <h2 className="text-2xl font-bold">{account?.name}</h2>
          <h3 className="text-xl">${Number(account?.balance).toFixed(2)}</h3>
        </div>
      </div>
      <div className="grow min-h-0 overflow-y-auto">
        <TransactionTable transactions={transactions ?? []} />
      </div>
    </div>
  );
};

export default AccountPage;

"use client";

import { FileIOModal } from "@/components/FileIOModal";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { Button } from "@/components/ui-kit/Button";
import { useAccount } from "@/hooks/accounts/useAccount";
import { useAccountTransactions } from "@/hooks/accounts/useAccountTransactions";
import { use, useState } from "react";

const AccountPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: account } = useAccount(id);
  const { data: transactions } = useAccountTransactions(id);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      {account && (
        <FileIOModal
          open={open}
          close={() => setOpen(false)}
          accountID={account.id}
        />
      )}
      <div className="p-2 flex">
        <div className="space-y-2">
          <Button type="button" onClick={() => setOpen(true)}>
            Import Statement
          </Button>
          <Button type="button"></Button>
          <Button type="button"></Button>
        </div>
        <div className="px-5">
          <h2 className="text-2xl font-bold">{account?.name}</h2>
          <h3 className="text-xl">${Number(account?.balance).toFixed(2)}</h3>
        </div>
      </div>
      <div className="grow overflow-y-auto">
        <TransactionTable transactions={transactions ?? []} />
      </div>
    </div>
  );
};

export default AccountPage;

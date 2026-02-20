"use client";

import { FileIOModal } from "@/components/FileIOModal";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { Button } from "@/components/ui-kit/Button";
import { Dropdown } from "@/components/ui-kit/Dropdown";
import { InputField } from "@/components/ui-kit/InputField";
import { useAccount } from "@/hooks/accounts/useAccount";
import { useAccountAnalytics } from "@/hooks/accounts/useAccountAnalytics";
import { useAccountTransactions } from "@/hooks/transactions/useAccountTransactions";
import { use, useState } from "react";
import { Pie, PieChart } from "recharts";

const AccountPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: account } = useAccount(id);
  const { data: transactions } = useAccountTransactions(id);
  const { data: analytics } = useAccountAnalytics(id);

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
        <div className="px-5">
          <PieChart
            responsive
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "500px",
              maxHeight: "80vh",
              aspectRatio: 1,
            }}
          >
            <Pie
              data={analytics}
              dataKey={"amount"}
              cx="50%"
              cy="50%"
              outerRadius="50%"
              fill="#8884d8"
              isAnimationActive
            />
          </PieChart>
        </div>
      </div>
      <div className="grow min-h-0 overflow-y-auto">
        <TransactionTable transactions={transactions ?? []} />
      </div>
    </div>
  );
};

export default AccountPage;
